import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewShortList.scss";
import { FaTrash } from "react-icons/fa";

const ViewShortList = () => {
    const [users, setUsers] = useState([]);
    const getShortListedUser = async (req, res) => {
        try {
            const response = await axios.get("http://localhost:8080/api/myShortlistedUsers", {
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
        getShortListedUser();
    }, []);
    return (
        <div className="chat-list">
            <h2>Shortlisted....</h2>
            {users.flat().map((chat) => (
                <div key={chat.id} className="chat-item">
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

export default ViewShortList;
