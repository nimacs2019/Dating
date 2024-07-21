import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.scss";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // login with google
    const loginWithGoogle = () => {
        window.open("http://localhost:8080/auth/google/callback", "_self");
    };

    // login
    const handleLogin = async (event) => {
        event.preventDefault();

        setError("");

        if (!email || !password) {
            setError("Both email and password are required.");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:8080/auth/login",
                { email, password },
                { withCredentials: true }
            );
            if (res.data.success) {
                alert("login Successful");
                navigate("/dashboard");
            } else {
                setError("Invalid email or password.");
            }
        } catch (error) {
            console.error("error :", error);
            setError("Please try again.");
        }
    };

    return (
        <section className="loginContainer">
            <div className="loginForm">
                <h2>Login</h2>
                <form>
                    <label>
                        <input
                            placeholder="Email:"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label>
                        <input
                            placeholder="Password:"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <div className="forgotten-password">
                        <a href="/forgot-password">Forgotten password?</a>
                    </div>
                    <button type="submit" onClick={handleLogin}>
                        Login
                    </button>

                    <p style={{ textAlign: "center", color: "red" }}>{error}</p>
                    <p style={{ textAlign: "center" }}>or</p>
                    <button type="button" className="google-login-button" onClick={loginWithGoogle}>
                        Login using Google
                    </button>

                    <p>
                        New Here? <Link to="/signup">Sign UP</Link>
                    </p>
                </form>
            </div>
        </section>
    );
}

export default Login;
