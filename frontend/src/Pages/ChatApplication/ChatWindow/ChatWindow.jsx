import React, { useEffect, useState } from "react";
import { addMessage, getMessages, userChats } from "../ChatRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import axios from "axios";
import "./ChatWindow.scss";

const ChatWindow = ({ chat, currentUser, setSendMessage, receivedMessage }) => {
    console.log("HHHHHHHH", chat);
    console.log("jjjjjjjjjjj", currentUser);
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    // fetching data for header
    useEffect(() => {
        if (!chat || !currentUser) return;
        const userId = chat.members.find((id) => id !== currentUser.userId);
        console.log("receiver id", userId);
        console.log("sender id", currentUser.userId);
        
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/user-details/${userId}`, {
                    withCredentials: true,
                });
                const result = response.data;
                setUserData(result);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        if (chat !== null) fetchData();
    }, [chat, currentUser]);

    // Fetching data for message
    useEffect(() => {
        if (!chat) return;
        const fetchMessage = async () => {
            try {
                const { data } = await getMessages(chat._id);
                // console.log("...>>>>,,,", data);
                // console.log('ddddddddd',currentUser.userId);
                setMessages(data);
            } catch (error) {console.error("Error fetching messages", error);}
        };
        fetchMessage();
    }, [chat]);

    const handleChange = (newMessage) => {
        setNewMessage(newMessage);
    };

    // Send Message
    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            senderId: currentUser.userId,
            text: newMessage,
            chatId: chat._id,
        };

        // send message to socket server
        const receiverId = chat.members.find((id) => id !== currentUser.userId);
        setSendMessage({ ...message, receiverId });

        // send message to database
        try {
            const { data } = await addMessage(message);
            setMessages([...messages, data]);
            setNewMessage("");
        } catch {
            console.log("error");
        }
    };

    // receives Message
    useEffect(() => {
        
        if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
            // setMessages([...messages, receivedMessage]);
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
    }, [receivedMessage,chat]);

    // const scroll = useRef();
    // const imageRef = useRef();
    return (
        <>
            <div className="ChatBox-container">
                {chat ? (
                    <>
                        {/* chat header */}
                        <div className="chat-header">
                            <div className="follower">
                                {userData &&
                                    userData.map((user, index) => (
                                        <div key={index}>
                                            <img
                                                src={`http://localhost:8080/${user.profilePicture}`}
                                                alt="photo"
                                                style={{ width: "50px", height: "50px" }}
                                            />

                                            <div className="name" style={{ fontSize: "0.8rem" }}>
                                                <span>{user.name}</span>
                                            </div>
                                        </div>
                                    ))}{" "}
                                <hr
                                    style={{
                                        width: "95%",
                                        border: "0.1px solid #ececec",
                                        marginTop: "20px",
                                    }}
                                />
                            </div>
                        </div>
                        {/* chat body */}
                        <div className="chat-body">
                            {messages &&
                                messages.map((message) => (
                                    <>
                                        <div
                                            key={message._id}
                                            className={
                                                message.senderId === currentUser.userId ? "message own" : "message received"
                                            }
                                        >
                                            {console.log("sender id", message.senderId)}
                                            {console.log("Auth id", currentUser.userId)}
                                            <span>{message.text}</span>
                                            <span>{format(message.createdAt)}</span>
                                        </div>
                                    </>
                                ))}
                        </div>
                        {/* chat sender */}
                        <div className="chat-sender">
                            {/* <div onClick={() => imageRef.current.click()}>+</div> */}
                            <div>+</div>
                            <InputEmoji value={newMessage} onChange={handleChange} />
                            <div className="btn button" onClick={handleSend}>
                                Send
                            </div>
                            <input type="file" name="" id="" style={{ display: "none" }} />
                            {/* ref={imageRef} */}
                        </div>{" "}
                    </>
                ) : (
                    <span className="chatbox-empty-message">Tap on a chat to start conversation...</span>
                )}
            </div>
        </>
    );
};

export default ChatWindow;
