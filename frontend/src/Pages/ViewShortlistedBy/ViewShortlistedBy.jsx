import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewShortlistedBy.scss";
import { FaTrash } from "react-icons/fa";

const ViewShortlistedBy = () => {
    const [users, setUsers] = useState([]);

    const getShortListedByUser = async (req, res) => {
        try {
            const response = await axios.get("http://localhost:8080/api/shortlistedBy-User", {
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
        getShortListedByUser();
    }, []);
    return (
        <div className="chat-list">
            <h2>Liked By........</h2>
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

export default ViewShortlistedBy;
