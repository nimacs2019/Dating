import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Conversation.css";

const Conversation = ({ data, currentUserID }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUserID);
        console.log("userId from conversation", userId);
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

        fetchData();
    }, []);
    return (
        <div className="conversation">
            <div className="online-dot"></div>
            {userData &&
                userData.map((user, index) => (
                    <div className="imageName" key={index}>
                        <img
                            src={`http://localhost:8080/${user.profilePicture}`}
                            alt="photo"
                            style={{ width: "60px", height: "60px" }}
                        />
                        <div className="name" style={{ fontSize: "0.8rem",marginTop:"10px" }}>
                            <span style={{ fontSize: "17px", fontWeight: "700" }}>{user.name}</span>
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
    );
};

export default Conversation;
