import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";
import Axios from 'axios'

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import './SignUpForm.scss';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [valid, setValid] = useState(true);
    const navigate = useNavigate();

    const handleChange = (inputValue) => {
        setPhoneNumber(inputValue);
        validatePhoneNumber(inputValue);
    };

    const validatePhoneNumber = (inputNumber) => {
        const phoneNumberObject = parsePhoneNumberFromString (`+${inputNumber}`);
        return setValid(phoneNumberObject ? phoneNumberObject.isValid() : false);
    };
    console.log(valid);

    const handleSubmit = (event) => {
        event.preventDefault();
        Axios.post(`http://localhost:8080/mobile`, { phoneNumber })
            .then((res) => {
                if (res.data) {
                    setPhoneNumber("");
                    navigate("/otp");
                }
            })
            .catch((error) => {
                console.error('There was an error making the request:', error);
            });
    };

    return (
        <section  >
            <div className="signUpForm">
            <h2>Sign Up</h2>
                <form>
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
                            {!valid && phoneNumber.length > 0 && <p style={{color:'red'}}>Please enter a valid phone number.</p>}
                        </div>{" "}
                   </label>

                   

                    <button type="submit" onClick={handleSubmit}>Sign Up with Phone</button>
                    <p style={{ textAlign: "center" }}>or</p>
                    <button type="button" className="google-signup-button">
                        Sign Up with Google
                    </button>
                </form>
            </div>
        </section>
    );
};

export default SignUpForm;
