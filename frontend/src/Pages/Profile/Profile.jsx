import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
    const [userData, setUserData] = useState({});

    const getUser = async () => {
        try {
            const response = axios.get("http://localhost:8080/login/sucess", { withCredentials: true });
            console.log("UserData", response);
        } catch (error) {}
    };

    useEffect(() => {
        getUser();
    }, []);
    return <div>Profile</div>;
}

export default Profile;
