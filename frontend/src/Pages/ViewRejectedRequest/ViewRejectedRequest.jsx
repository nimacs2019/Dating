import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewRejectedRequest.scss";
import { FaTrash } from "react-icons/fa";

const ViewRejectedRequest = () => {
    const [users, setUsers] = useState([]);
    const getRequestRejected = async (req, res) => {
        try {
            const response = await axios.get("http://localhost:8080/api/rejected-request", {
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
        getRequestRejected();
    }, []);
    return (
        <div className="chat-list">
            <h2>Rejected Request.... </h2>

            {users.map((user) => (
                <div key={user.id} className="chat-item">
                    <img src={`http://localhost:8080/${user.receiver.profilePicture}`} alt="photo" />
                    <div className="chat-info">
                        <h4>{user.receiver.name}</h4>
                        <p >Status:<span style={{color:'green'}}> {user.status}</span></p>
                    </div>
                    <FaTrash />
                </div>
            ))}
        </div>
    );
};

export default ViewRejectedRequest;
