import React from "react";

function Home() {
    const logout = () => {
        window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "self");
    };
    return (
        <div>
            Home
            <button onClick={logout} type="submit" className="login-button">
                log out
            </button>
        </div>
    );
}

export default Home;
