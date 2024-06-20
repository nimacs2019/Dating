import React from "react";
import { Link } from "react-router-dom";
import "./Style.css";
import downloadImage from "../../Assets/Images/download.jpg";
import downloadImage1 from "../../Assets/Images/logoImage.jpeg";

function Sign() {
    const googleAuth = () => {
        window.open(`${process.env.REACT_APP_API_URL}/auth/google/callback`, "_self");
    };
    return (
        <div>
            <div className="container">
                <div className="left-side">
                    <img src={downloadImage1} alt="Placeholder" className="image" />
                </div>
                <div className="right-side">
                    <h2>Sign Up</h2>
                    <form>
                        <div className="input-group">
                            <label>Username</label>
                            <input type="text" id="username" name="username" required />
                        </div>
                        <div className="input-group">
                            <label>Email</label>
                            <input type="email" id="email" name="email" required />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <input type="password" id="password" name="password" required />
                        </div>
                        <button type="submit" className="signup-button">
                            Sign Up
                        </button>
                        <p style={{textAlign:'center'}}>or</p>
                        <button type="button" className="google-login-button" onClick={googleAuth}>
                            <img src={downloadImage} alt="Google Logo" className="google-logo" />
                            sign in using Google
                        </button>{" "}
                        <p>
                            Aready have account ? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Sign;
