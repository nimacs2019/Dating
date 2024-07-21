import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatApplication.scss";
import { userChats } from "./ChatRequest";
import ChatWindow from "./ChatWindow/ChatWindow";
import Conversation from "../Conversation/Conversation";
import { io } from "socket.io-client";

const ChatApplication = () => {
    const [chats, setChats] = useState([]);
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [currentChat, setCurrentChat] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);

    const socket = useRef(null);

    useEffect(() => {
        const getProfileAndChats = async () => {
            try {
                // Fetch user profile data
                const profileResponse = await axios.get("http://localhost:8080/api/my-profile", { withCredentials: true });
                const profileData = profileResponse.data;
                setUser(profileData);
                console.log(profileData);

                // Fetch chat data using the profile data
                if (profileData?.userId) {
                    const chatsResponse = await userChats(profileData.userId);
                    setChats(chatsResponse.data);
                    console.log(chatsResponse.data);
                }
            } catch (error) {
                console.error("Error fetching data:", error.message);
            } finally {
                setLoading(false);
            }
        };

        getProfileAndChats();
    }, []);

    // Connect to Socket.io
    useEffect(() => {
        if (user?.userId) {
            socket.current = io("http://localhost:8000");
            socket.current.emit("new-user-add", user.userId);
            socket.current.on("get-users", (users) => {
                setOnlineUsers(users);
                console.log(onlineUsers);
            });
        }
    }, [user]);
    useEffect(() => {
        if (socket.current) {
            socket.current.on("receive-message", (data) => {
                console.log(data);
                setReceivedMessage(data);
            });
        }
    }, []);

    // sending message to socket server
    useEffect(() => {
        if (sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);

    // receive message from socket server

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="Chat">
            {/* Left Side */}
            <div className="Left-side-chat">
                <div className="Chat-container">
                    <h2>Chats</h2>
                    <div className="Chat-list">
                        {chats.map((chat) => (
                            <div onClick={() => setCurrentChat(chat)}>
                                <Conversation data={chat} currentUserID={user.userId} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side */}

            <div className="Right-side-chat">
                <ChatWindow
                    chat={currentChat}
                    currentUser={user}
                    setSendMessage={setSendMessage}
                    receivedMessage={receivedMessage}
                />
            </div>
        </div>
    );
};

export default ChatApplication;
