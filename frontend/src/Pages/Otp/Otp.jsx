import React, { useState } from "react";
import axios from "axios";
import "./Otp.scss";

const Otp = ({userNumber}) => {
    console.log('value of usenumber',userNumber);
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setOtp(e.target.value);
    };

    const handleVerifyOTP = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        

        try {
            const res = await axios.post("http://localhost:8080/otp", { otp, userNumber });
            console.log("Response from backend:", res.data);
            if (res.data.resp.valid) {
                setSuccess("OTP verified successfully!");
            } else {
                setError("Expired OTP");
            }
        } catch (error) {
            console.error("There was an error making the request:", error);
            setError("Failed to verify OTP. Please try again.");
        }
    };

    return (
        <secton className="otpContainer">
            <div className="otpEntry">
                <h2>Enter OTP</h2>
                <form onSubmit={handleVerifyOTP}>
                    <label>
                        OTP:
                        <input type="text" value={otp} onChange={handleChange} maxLength="6" />
                    </label>
                    <button type="submit" >
                        Verify OTP
                    </button>
                </form>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <button className="resend-button">Resend OTP</button>
            </div>
        </secton>
    );
};

export default Otp;
