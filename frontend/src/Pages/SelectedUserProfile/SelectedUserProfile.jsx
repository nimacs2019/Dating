import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaHeart } from "react-icons/fa";
import { BiMessage, BiBell, BiHide, BiSend } from "react-icons/bi";
import "./SelectedUserProfile.scss";
import { addToChatList } from "../ChatApplication/ChatRequest";

const SelectedUserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [req_notifications, setReqNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [activeTab, setActiveTab] = useState("details");
    const [userProfileData, setUserProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [hasRequests, setHasRequests] = useState();
    const [hiddenUsers, setHiddenUsers] = useState([]);

    const getSelectedUserProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/user-details/${id}`, { withCredentials: true });
            setUserProfileData(response.data);
        } catch (error) {
            console.error("Error :", error.message);
        } finally {
            setLoading(false);
        }
    };

    // const checkForRequests = async () => {
    //     try {
    //         const response = await axios.get(`http://localhost:8080/api/req-notifications`, {

    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             withCredentials: true,
    //         });
    //         setHasRequests(response.data.length > 0);
    //         if (response.data.length > 0) {
    //             setReqNotifications(response.data);
    //         }
    //     } catch (error) {
    //         console.error("Error checking for requests:", error);
    //     }
    // };

    const checkForRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/req-notifications`, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });
            const filteredNotifications = response.data.filter((notification) => notification.sender.userId === id);
            setHasRequests(filteredNotifications.length > 0);
            if (filteredNotifications.length > 0) {
                setReqNotifications(filteredNotifications);
            }
        } catch (error) {
            console.error("Error checking for requests:", error);
        }
    };

    useEffect(() => {
        getSelectedUserProfile();
        checkForRequests();
    }, [id]);

    const handleShortList = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/shortlist",
                { receiverId: id },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            alert(response.data.message);

            console.log(response.data);
        } catch (error) {
            if (error.response) {
                console.error("Response error:", error.response.data);
                alert(error.response.data.message);
            }
        }
    };

    const handleRequestSend = async () => {
        try {
            const response = await axios.post(
                "http://localhost:8080/request-send",
                { receiverId: id },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            alert(response.data.message);

            console.log(response.data);
        } catch (error) {
            if (error.response) {
                console.error("Response error:", error.response.data);
                alert(error.response.data.message);
            }
        }
    };

    // const handleMessage = async () => {
    //     navigate(`/chat-application`);
    // };

    // const handleMessage = async () => {
    //     try {
    //         await axios.post(
    //             "http://localhost:8080/api/add-to-chatlist",
    //             { userId: id },
    //             {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 withCredentials: true,
    //             }
    //         );
    //         navigate(`/chat-application`);
    //     } catch (error) {
    //         console.error("Error adding user to chat list:", error);
    //         alert("Error: Unable to add the user to chat list");
    //     }
    // };

    const handleMessage = async () => {
        try {
            const response = await addToChatList({ receiverId: id });
            console.log("User added to chat list:", response.data);
            navigate(`/chat-application`);
        } catch (error) {
            console.error("Error adding user to chat list:", error);
            alert("Error: Unable to add the user to chat list");
        }
    };

    const handleRequestnotification = () => {
        setShowNotifications(!showNotifications);
    };

    const handleAcceptRequest = async (notification_id) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/accept-request`,
                { notificationID: notification_id },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            if (response && response.data && response.data.message) {
                alert(response.data.message);
                checkForRequests();
            } else {
                console.error("Invalid response format:", response);
                alert("Error: Invalid response format");
            }
        } catch (error) {
            console.error("Error accepting notification:", error);
            alert("Error: Unable to accept the request");
        }
    };

    const handleRejectRequest = async (notification_id) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/api/reject-request`,
                { notificationID: notification_id },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            if (response && response.data && response.data.message) {
                alert(response.data.message);
                checkForRequests();
                // fetchRequestNotifications();
            } else {
                console.error("Invalid response format:", response);
                alert("Error: Invalid response format");
            }
        } catch (error) {
            console.error("Error reject notification:", error);
            alert("Error: Unable to reject the request");
        }
    };

    const handleDoNotShow = async () => {
        try {
            await axios.post(
                `http://localhost:8080/api/do-not-show`,
                { hide_id: id },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            setHiddenUsers([...hiddenUsers, id]);
            alert("User hidden successfully");
        } catch (error) {
            console.error("Error hiding the user profile:", error);
            alert("Error: Unable to hide the user profile");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }
    if (!userProfileData) {
        return <div>No user data found</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-left">
                <div className="profile-image">
                    {userProfileData[0].profilePicture && (
                        <img src={`http://localhost:8080/${userProfileData[0].profilePicture}`} alt="photo" />
                    )}
                </div>
                <div className="profile-name">{userProfileData[0].name}</div>
                <h6>Lorem, ipsum dolor sit amet consectetur....</h6>
                <div className="btn-container">
                    <button onClick={handleShortList} className="btn">
                        <FaHeart />
                    </button>
                    <button className="btn">
                        <BiMessage onClick={handleMessage} />
                    </button>

                    <button onClick={handleRequestnotification} className="btn">
                        <BiBell />
                    </button>

                    {!req_notifications.length > 0 && (
                        <button onClick={handleRequestSend} className="btn">
                            <BiSend />
                        </button>
                    )}

                    <button className="btn" onClick={handleDoNotShow}>
                        <BiHide />
                    </button>
                </div>
            </div>
            <div className="profile-right">
                <div className="profile-tabs">
                    <button className="btn" onClick={() => setActiveTab("details")}>
                        Account Details
                    </button>{" "}
                    &nbsp;
                    <button className="btn" onClick={() => setActiveTab("media")}>
                        Media
                    </button>
                </div>
                {hasRequests && showNotifications && req_notifications.length > 0 ? (
                    <div className="chat-list">
                        <h2>Request Notification....</h2>
                        {req_notifications.map((notification) => (
                            <>
                                <div key={notification.id} className="chat-item">
                                    <img src={`http://localhost:8080/${notification.sender.profilePicture}`} alt="photo" />
                                    <div className="chat-info">
                                        <h4>{notification.sender.name}</h4>
                                        <p>Are you Interested ?</p>
                                    </div>
                                </div>
                                <div className="notification-action">
                                    <button onClick={() => handleAcceptRequest(notification._id)} className="btn">
                                        &nbsp;Accept
                                    </button>
                                    <button onClick={() => handleRejectRequest(notification._id)} className="btn">
                                        &nbsp;Rejcet
                                    </button>
                                </div>
                            </>
                        ))}
                    </div>
                ) : (
                    <div className="profile-content">
                        {activeTab === "details" && (
                            <div>
                                <h2>Contact Information</h2>
                                <hr />
                                <p>
                                    <strong>Phone:</strong> {userProfileData[0].mob}
                                </p>
                                <p>
                                    <strong>Address:</strong> {userProfileData[0].address}
                                </p>
                                <p>
                                    <strong>Email:</strong> {userProfileData[0].email}
                                </p>
                                <p>
                                    <strong>Site:</strong> {userProfileData[0].site}
                                </p>
                                <h2>Basic Information</h2>
                                <hr />
                                <p>
                                    <strong>Birthday:</strong>{" "}
                                    {new Date(userProfileData[0].dob).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                                <p>
                                    <strong>Age:</strong> {userProfileData[0].age}
                                </p>
                                <p>
                                    <strong>Gender:</strong> {userProfileData[0].gender}
                                </p>
                                <p>
                                    <strong>Qualification:</strong> {userProfileData[0].qualification}
                                </p>
                                <p>
                                    <strong>Occupation: </strong> {userProfileData[0].gender}
                                </p>
                                <h2>Hobbies and Interests</h2>
                                <hr />
                                <p>
                                    <strong>Hobbies:</strong> {JSON.parse(userProfileData[0].hobbies || "[]").join(", ")}
                                </p>
                                <p>
                                    <strong>Interests:</strong>{" "}
                                    {JSON.parse(userProfileData[0].interests || "[]").join(", ")}
                                </p>
                                <p>
                                    <strong>Drinking Habbits:</strong> {userProfileData[0].drinkingHabits}
                                </p>
                                <p>
                                    <strong>Smoking Habbits:</strong> {userProfileData[0].smokingHabits}
                                </p>
                            </div>
                        )}
                        {activeTab === "media" && (
                            <>
                                <div class="media-content">
                                    <div class="images-section">
                                        <h2>Photos</h2>
                                        <hr />
                                        {userProfileData[0].moreImages.map((image, index) => (
                                            <img
                                                key={index}
                                                src={`http://localhost:8080/${image}`}
                                                alt={`photo-${index}`}
                                            />
                                        ))}{" "}
                                    </div>
                                    <div class="videos-section">
                                        <h2>Videos</h2>
                                        <hr />
                                        {userProfileData[0].reels.map((video, index) => (
                                            <video key={index} controls>
                                                <source src={`http://localhost:8080/${video}`} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SelectedUserProfile;
