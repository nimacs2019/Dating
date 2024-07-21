import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import "./SignUpForm.scss";
import { Link } from "react-router-dom";
import Otp from "../Otp/Otp";

const SignUpForm = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [valid, setValid] = useState(true);
    const [error, setError] = useState("");
    const [showOTPComponent, setShowOTPComponent] = useState(false);

    const handleChange = (inputValue) => {
        setPhoneNumber(inputValue);
        validatePhoneNumber(inputValue);
    };

    const validatePhoneNumber = (inputNumber) => {
        const phoneNumberObject = parsePhoneNumberFromString(`+${inputNumber}`);
        return setValid(phoneNumberObject ? phoneNumberObject.isValid() : false);
    };
    console.log(valid);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (phoneNumber === "") {
            setValid(false);
            setError("Phone number is required.");
            return;
        }
        axios
            .post(`http://localhost:8080/mobile`, { phoneNumber })
            .then((res) => {
                if (res.data) {
                    setPhoneNumber("");
                    // navigate("/otp");
                    // <Otp phoneNumber={phoneNumber}/>
                    setShowOTPComponent(true);
                }
            })
            .catch((error) => {
                console.error("There was an error making the request:", error);
            });
    };

    // Sign Up with google
    const signUpWithGoogle = () => {
        window.open("http://localhost:8080/auth/google/callback", "_self");
    };

    return (
        <section>
            <div className="signUpForm">
                <h2>Sign Up</h2>
                <form>
                    <label>
                        Name:
                        <div className="inputField">
                            <input type="text" />
                        </div>{" "}
                    </label>
                    {!showOTPComponent ? (
                        <>
                            <label>
                                Phone Number:
                                <div className="inputField">
                                    <PhoneInput
                                        country={"in"}
                                        value={phoneNumber}
                                        onChange={handleChange}
                                        enableSearch
                                        countryCodeEditable={false}
                                    />
                                    {!valid && phoneNumber.length > 0 && (
                                        <p style={{ color: "red" }}>Please enter a valid phone number.</p>
                                    )}
                                </div>{" "}
                            </label>
                            <button type="submit" onClick={handleSubmit}>
                                Sign Up with Phone
                            </button>
                            {error && <p style={{ color: "red" }}>{error}</p>}
                        </>
                    ) : (
                        <Otp phoneNumber={phoneNumber}/>
                    )}

                    <p style={{ textAlign: "center" }}>or</p>
                    <button type="button" className="google-signup-button" onClick={signUpWithGoogle}>
                        Sign Up with Google
                    </button>
                </form>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>

            {/* {!showOTPComponent ? (
                <form onSubmit={handleSubmit}>
                    <label>
                        Phone Number:
                        <input type="text" value={phoneNumber} onChange={handleChange} />
                    </label>
                    <button type="submit">Submit</button>
                    {!valid && <p>{error}</p>}
                </form>
            ) : (
                <Otp phoneNumber={phoneNumber} />
            )} */}
        </section>
    );
};

export default SignUpForm;
