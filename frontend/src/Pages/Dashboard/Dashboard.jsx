import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.scss";

function Dashboard() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userResponse, profileResponse] = await Promise.all([
                    axios.get("http://localhost:8080/api/user-details", { withCredentials: true }),
                    axios.get("http://localhost:8080/api/my-profile", { withCredentials: true }),
                ]);

                
                setUsers(userResponse.data);
                setCurrentUser(profileResponse.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchData();
    }, []);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    const filterUsersByLocation = (location) => {
        return users.filter((user) => user.dist === location && user._id !== currentUser._id);
    };

    const filterUsersByJob = (job) => {
        return users.filter((user) => user.job === job && user._id !== currentUser._id);
    };

    const filterUsersByQualification = (qualification) => {
        return users.filter((user) => user.qualification === qualification && user._id !== currentUser._id);
    };

    const handleCardClick = (userId) => {
        navigate(`/user/${userId}`);
    };

    const renderUserData = (filteredUsers) => {
        return filteredUsers.map((user) => (
            <div key={user._id} className="card" onClick={() => handleCardClick(user.userId)}>
                <img src={`http://localhost:8080/${user.profilePicture}`} alt="photo" />
                <div className="card-bottom">
                    <h3>{user.name}</h3>
                    <p>{user.dist}</p>
                </div>
            </div>
        ));
    };

    return (
        <div className="nearby-users">
            <h1>Who's Nearby?</h1>

            <div className="section">
                <h2>Distance</h2>
                <div className="cards-container">{renderUserData(filterUsersByLocation(currentUser.dist))}</div>
            </div>

            <div className="section">
                <h2>Job</h2>
                <div className="cards-container">{renderUserData(filterUsersByJob(currentUser.job))}</div>
            </div>

            <div className="section">
                <h2>Qualification</h2>
                <div className="cards-container">
                    {renderUserData(filterUsersByQualification(currentUser.qualification))}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
