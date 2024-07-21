import React, { useEffect, useState } from "react";
import "./Header.scss";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Header() {
    const [active, setAcive] = useState("navBar");
    const [navLinkColor, setNavLinkColor] = useState("navLink");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const showNavbar = () => {
        setAcive("navBar activeNavbar");
    };

    const removeNavbar = () => {
        setAcive("navBar");
    };

    // background for navbar when scrolling
    const [transperent, setTransperent] = useState("header");

    const addBG = () => {
        if (window.scrollY >= 10) {
            setTransperent("header activeHeader");
            setNavLinkColor("navLink activeNavLink");
        } else {
            setTransperent("header");
            setNavLinkColor("navLink ");
        }
    };

    window.addEventListener("scroll", addBG);

    const checkAuthStatus = () => {
        const connectionId = Cookies.get("connect.sid");
        const userToken = Cookies.get("jwt");

        // console.log("Connection ID:", connectionId);
        // console.log("User Token:", userToken);

        setIsLoggedIn(!!connectionId || !!userToken);

        // console.log("All Cookies:", Cookies.get());
    };

    const handleLogout = () => {
        Cookies.remove("connect.sid");
        Cookies.remove("jwt");
        setIsLoggedIn(false);
        navigate("/login");
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <section className="navBarSection">
            <div className={transperent}>
                <div className="logoDiv">
                    <a href="/" className="logo">
                        <h1 className="flex">
                            {" "}
                            <svg
                                id="logo-15"
                                width="10%"
                                height="10%"
                                viewBox="0 0 49 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M24.5 12.75C24.5 18.9632 19.4632 24 13.25 24H2V12.75C2 6.53679 7.03679 1.5 13.25 1.5C19.4632 1.5 24.5 6.53679 24.5 12.75Z"
                                    className="ccustom"
                                    fill="#fc6501"
                                ></path>
                                <path
                                    d="M24.5 35.25C24.5 29.0368 29.5368 24 35.75 24H47V35.25C47 41.4632 41.9632 46.5 35.75 46.5C29.5368 46.5 24.5 41.4632 24.5 35.25Z"
                                    className="ccustom"
                                    fill="#fc6501"
                                ></path>
                                <path
                                    d="M2 35.25C2 41.4632 7.03679 46.5 13.25 46.5H24.5V35.25C24.5 29.0368 19.4632 24 13.25 24C7.03679 24 2 29.0368 2 35.25Z"
                                    className="ccustom"
                                    fill="#fc0133"
                                ></path>
                                <path
                                    d="M47 12.75C47 6.53679 41.9632 1.5 35.75 1.5H24.5V12.75C24.5 18.9632 29.5368 24 35.75 24C41.9632 24 47 18.9632 47 12.75Z"
                                    className="ccustom"
                                    fill="#fc0133"
                                ></path>
                            </svg>
                            &nbsp; &nbsp; App Name
                        </h1>
                    </a>
                </div>

                <div className={active}>
                    <ul className="navLists flex">
                        {isLoggedIn && (
                            <>
                                <li className="navItem">
                                    <Link to="/dashboard" className={navLinkColor}>
                                        Home
                                    </Link>
                                </li>
                                <li className="navItem">
                                    <Link to="/view-request-sentList" className={navLinkColor}>
                                        Sent
                                    </Link>
                                </li>
                                <li className="navItem">
                                    <Link to="/view-request-accepted" className={navLinkColor}>
                                        Accept
                                    </Link>
                                </li>
                                <li className="navItem">
                                    <Link to="/view-request-rejected" className={navLinkColor}>
                                        Reject
                                    </Link>
                                </li>
                                <li className="navItem">
                                    <Link to="/view-request-received" className={navLinkColor}>
                                        Received
                                    </Link>
                                </li>
                                <li className="navItem">
                                    <Link to="/view-shortlisted" className={navLinkColor}>
                                        Shortlisted
                                    </Link>
                                </li>
                                <li className="navItem">
                                    <Link to="/view-shortlistedBy" className={navLinkColor}>
                                        ShortlistedBy
                                    </Link>
                                </li>
                                <li className="navItem">
                                    <Link to="/chat-application" className={navLinkColor}>
                                        Message
                                    </Link>
                                </li>
                                <li className="navItem">
                                    <Link to="/my-profile" className={navLinkColor}>
                                        Profile
                                    </Link>
                                </li>
                            </>
                        )}

                        <div className="authbtns flex">
                            {isLoggedIn ? (
                                <button className="btn logoutBtn" onClick={handleLogout}>
                                    Logout
                                </button>
                            ) : (
                                <button className="btn loginBtn">
                                    <Link to="/login">Login</Link>
                                </button>
                            )}
                        </div>
                    </ul>
                    <div className="closeNavBar" onClick={removeNavbar}>
                        <AiFillCloseCircle className="icon" />
                    </div>
                </div>

                <div className="toggleNavbar" onClick={showNavbar}>
                    <FaBars className="icon" />
                </div>
            </div>
        </section>
    );
}

export default Header;
