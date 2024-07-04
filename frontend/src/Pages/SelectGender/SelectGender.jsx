import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SelectGender.scss'

const SelectGender = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const navigate = useNavigate()

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };
    const handleSubmit = ()=>{
        navigate('/dashboard')
    }

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
