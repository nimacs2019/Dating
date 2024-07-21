import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";

const ViewRequestNotification = ({ req_notifications }) => {
    console.log("................../..../..../", req_notifications);

    return (
        <div className="chat-list">
            <h2>Request Notification....</h2>
            {req_notifications.map((chat) => (
                <div key={chat.id} className="chat-item">
                    <img src={`http://localhost:8080/${chat.profilePicture}`} alt="photo" />
                    <div className="chat-info">
                        <h4>{chat.name}</h4>
                    </div>
                    <FaCheck />
                    <FaTimes />
                </div>
            ))}
        </div>
    );
};

export default ViewRequestNotification;
