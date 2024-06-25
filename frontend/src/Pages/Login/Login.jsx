import React from "react";
import { Link } from "react-router-dom";
import "./Login.scss";

function Login() {
    const loginWithGoogle = () => {
        window.open("http://localhost:8080/auth/google/callback", "_self");
    };
    return (
        <section className="loginContainer">
            <div className="loginForm">
                <h2>Login</h2>
                <form>
                    <label>
                        Email:
                        <input type="email" name="email" />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" />
                    </label>
                    <div className="forgotten-password">
                        <a href="/forgot-password">Forgotten password?</a>
                    </div>
                    <button type="submit">Login</button>
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
