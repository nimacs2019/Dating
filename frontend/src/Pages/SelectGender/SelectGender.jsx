import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SelectGender.scss";

const SelectGender = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const navigate = useNavigate();

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const handleSubmit = async () => {
        console.log("Selected Option", selectedOption);
        if (!selectedOption) {
            console.log("Choose your preference");
        }
        try {
            const response = await axios.post(
                "http://localhost:8080/api/gender-preference",
                { genderPreference: selectedOption },
                { withCredentials: true }
            );
            if (response.data.success) {
                navigate("/dashboard");
            } else {
                console.log("Error in submitting data");
            }
        } catch (error) {
            console.error("Error :", error.message);
        }
    };

    return (
        <div className="preference-container">
            <h1>Choose your Preference</h1>
            <div className="radio-buttons">
                <label>
                    <input type="radio" value="Men" checked={selectedOption === "Men"} onChange={handleOptionChange} />
                    Men
                </label>
                <label>
                    <input type="radio" value="Women" checked={selectedOption === "Women"} onChange={handleOptionChange} />
                    Women
                </label>
                <label>
                    <input type="radio" value="Both" checked={selectedOption === "Both"} onChange={handleOptionChange} />
                    Both
                </label>
            </div>
            <button onClick={handleSubmit} className="btn" type="submit">
                Next
            </button>
        </div>
    );
};

export default SelectGender;
