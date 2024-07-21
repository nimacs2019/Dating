import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewRequestReceived.scss";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ViewRequestReceived = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const getReceivedRequests = async (req, res) => {
        try {
            const response = await axios.get("http://localhost:8080/api/request-received", {
                headers: {
                    "Content-type": "application/json",
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                const data = response.data;
                setUsers(data);
                console.log(data);
            }
        } catch (error) {
            console.error("Error fetching short list:", error);
        }
    };
    useEffect(() => {
        getReceivedRequests();
    }, []);

    const handleUsers = (userId) => {
        navigate(`/user/${userId}`);
    };
    return (
        <div className="chat-list">
            <h2>Liked By........</h2>
            {users.flat().map((chat) => (
                <div key={chat.id} className="chat-item" onClick={() => handleUsers(chat.userId)}>
                    <img src={`http://localhost:8080/${chat.profilePicture}`} alt="photo" />
                    <div className="chat-info">
                        <h4>{chat.name}</h4>
                    </div>
                    <FaTrash />
                </div>
            ))}
        </div>
    );
};

export default ViewRequestReceived;
