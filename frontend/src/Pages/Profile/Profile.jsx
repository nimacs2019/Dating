import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
    const [userData, setUserData] = useState({});
    console.log(userData);

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:8080/login/success", { withCredentials: true });
            console.log("UserData", response);
            setUserData(response.data.user)
        } catch (error) {}
    };

    useEffect(() => {
        getUser();
    }, []);
    return <div>Profile</div>;
}

export default Profile;
