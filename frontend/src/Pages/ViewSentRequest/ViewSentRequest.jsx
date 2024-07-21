import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewSentRequest.scss";
import { FaTrash } from "react-icons/fa";

const ViewSentRequest = () => {
    const [users, setUsers] = useState([]);
    const getRequestSentUser = async (req, res) => {
        try {
            const response = await axios.get("http://localhost:8080/api/view-requestSentList", {
                headers: {
                    "Content-type": "application/json",
                },
                withCredentials: true,
            });

            if (response.status === 200) {
                const data = response.data;
                setUsers(data);
                // console.log(data);
            }
        } catch (error) {
            console.error("Error fetching request Users list:", error);
        }
    };

    console.log(".....///////........", users);

    useEffect(() => {
        getRequestSentUser();
    }, []);
    return (
        <div className="chat-list">
            <h2>Request Sent....</h2>

            {users.flat().map((user) => (
                <div key={user.id} className="chat-item">
                    <img src={`http://localhost:8080/${user.profilePicture}`} alt="photo" />
                    <div className="chat-info">
                        <h4>{user.name}</h4>
                    </div>
                    <FaTrash />
                </div>
            ))}
        </div>
    );
};

export default ViewSentRequest;
