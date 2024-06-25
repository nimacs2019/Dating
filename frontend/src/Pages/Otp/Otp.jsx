
import React, { useState } from 'react';
// import { useHistory } from "react-router-dom";
import Axios from 'axios'
import './Otp.scss';

const Otp = ({ userNumber }) => {
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");
    
        Axios.post('http://localhost:8080/otp', { otp, userNumber })
          .then((res) => {
            if (res.data.resp.valid) {
              setSuccess("OTP verified successfully!");
            } else {
              setError("Expired OTP");
            }
          })
          .catch((error) => {
            console.error("There was an error making the request:", error);
            setError("Failed to verify OTP. Please try again.");
          });
      };

    return (
       <secton className="otpContainer">
            <div className="otpEntry">
                <h2>Enter OTP</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        OTP:
                        <input type="text" value={otp} onChange={handleChange} maxLength="6" />
                    </label>
                    <button type="submit" onClick={handleSubmit}>Verify OTP</button>
                </form>
                <button className="resend-button">Resend OTP</button>
            </div>
       </secton>
    );
};

export default Otp;
