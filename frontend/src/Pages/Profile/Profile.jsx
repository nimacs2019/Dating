import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.scss";
import {FaPen} from 'react-icons/fa'

const Profile = () => {
    const [activeTab, setActiveTab] = useState("details");
    const [userProfileData, setUserProfileData] = useState();
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [updatedProfileData, setUpdatedProfileData] = useState({});

    const getMyProfile = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/my-profile", { withCredentials: true });
            // console.log("Response status:", response.status);
            // console.log("Profile Data:", response.data);
            setUserProfileData(response.data);
            setUpdatedProfileData(response.data);
        } catch (error) {
            console.error("Error :", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMyProfile();
    }, []);
    console.log("this is my profile", userProfileData);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfileData((prevData) => ({ ...prevData, [name]: value }));
    };
    const saveProfile = async () => {
        try {
            const response = await axios.put("http://localhost:8080/api/update-profile", updatedProfileData, {
                withCredentials: true,
            });
            setUserProfileData(updatedProfileData);
            setEditMode(false);
            alert("Profile updated successfully");
        } catch (error) {
            console.error("Error updating profile:", error.message);
        }
    };
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="profile-container">
            <div className="profile-left">
                <div className="profile-image">
                    {userProfileData.profilePicture && (
                        <img src={`http://localhost:8080/${userProfileData.profilePicture}`} alt="photo" />
                    )}
                </div>
                <div className="profile-name">{userProfileData.name}</div>
                <p>Bio.....</p>
                <button onClick={() => setEditMode(!editMode)}>Edit Profile</button>&nbsp; &nbsp;
                {editMode && <button onClick={saveProfile}>Save Profile</button>}
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
                <div className="profile-content">
                    {activeTab === "details" && (
                        <div>
                            <h2>Contact Information</h2>
                            <hr />
                            <p>
                                <strong>Phone:</strong> {editMode ? (
                                    <input
                                        type="text"
                                        name="mob"
                                        value={updatedProfileData.mob}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    userProfileData.mob
                                )}
                                {editMode && <FaPen />}
                            </p>
                            <p>
                                <strong>Address:</strong> {editMode ? (
                                    <input
                                        type="text"
                                        name="address"
                                        value={updatedProfileData.address}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    userProfileData.address
                                )}
                                {editMode && <FaPen />}
                            </p>
                            <p>
                                <strong>Email:</strong> {editMode ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={updatedProfileData.email}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    userProfileData.email
                                )}
                                {editMode && <FaPen />}
                            </p>
                            <p>
                                <strong>Site:</strong> {editMode ? (
                                    <input
                                        type="text"
                                        name="site"
                                        value={updatedProfileData.site}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    userProfileData.site
                                )}
                                {editMode && <FaPen />}
                            </p>
                            <h2>Basic Information</h2>
                            <hr />
                            <p>
                                <strong>Birthday:</strong> {editMode ? (
                                    <input
                                        type="date"
                                        name="dob"
                                        value={updatedProfileData.dob}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    new Date(userProfileData.dob).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })
                                )}
                                {editMode && <FaPen />}
                            </p>
                            <p>
                                <strong>Age:</strong> {editMode ? (
                                    <input
                                        type="number"
                                        name="age"
                                        value={updatedProfileData.age}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    userProfileData.age
                                )}
                                {editMode && <FaPen />}
                            </p>
                            <p>
                                <strong>Gender:</strong> {editMode ? (
                                    <input
                                        type="text"
                                        name="gender"
                                        value={updatedProfileData.gender}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    userProfileData.gender
                                )}
                                {editMode && <FaPen />}
                            </p>
                            <p>
                                <strong>Qualification:</strong> {editMode ? (
                                    <input
                                        type="text"
                                        name="qualification"
                                        value={updatedProfileData.qualification}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    userProfileData.qualification
                                )}
                                {editMode && <FaPen />}
                            </p>
                            <p>
                                <strong>Occupation:</strong> {editMode ? (
                                    <input
                                        type="text"
                                        name="occupation"
                                        value={updatedProfileData.occupation}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    userProfileData.occupation
                                )}
                                {editMode && <FaPen />}
                            </p>
                            <h2>Hobbies and Interests</h2>
                            <hr />
                            <p>
                                <strong>Hobbies:</strong> {editMode ? (
                                    <input
                                        type="text"
                                        name="hobbies"
                                        value={updatedProfileData.hobbies}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    JSON.parse(userProfileData.hobbies || "[]").join(", ")
                                )}
                                {editMode && <FaPen />}
                            </p>
                            <p>
                                <strong>Interests:</strong> {editMode ? (
                                    <input
                                        type="text"
                                        name="interests"
                                        value={updatedProfileData.interests}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    JSON.parse(userProfileData.interests || "[]").join(", ")
                                )}
                                {editMode && <FaPen />}
                            </p>
                            <p>
                                <strong>Drinking Habits:</strong> {editMode ? (
                                    <input
                                        type="text"
                                        name="drinkingHabits"
                                        value={updatedProfileData.drinkingHabits}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    userProfileData.drinkingHabits
                                )}
                                {editMode && <FaPen />}
                            </p>
                            <p>
                                <strong>Smoking Habits:</strong> {editMode ? (
                                    <input
                                        type="text"
                                        name="smokingHabits"
                                        value={updatedProfileData.smokingHabits}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    userProfileData.smokingHabits
                                )}
                                {editMode && <FaPen />}
                            </p>
                        </div>
                    )}
                    {activeTab === "media" && (
                        <>
                            <div class="media-content">
                                <div class="images-section">
                                    <h2>Photos</h2>
                                    <hr />
                                    {userProfileData.moreImages.map((image, index) => (
                                        <img key={index} src={`http://localhost:8080/${image}`} alt={`photo-${index}`} />
                                    ))}{" "}
                                </div>
                                <div class="videos-section">
                                    <h2>Videos</h2>
                                    <hr />
                                    {userProfileData.reels.map((video, index) => (
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
            </div>
        </div>
    );
};

export default Profile;
