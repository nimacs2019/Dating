import React, { useState } from "react";
import "./Gender.scss";

const Gender = ({ closeModal, setSelectedGender }) => {
    const GenderList = ["Male", "Female", "TransGender"];

    const [selectedGender, setSelectedGenderInModel] = useState([]);

    const handleSubmit = () => {
        setSelectedGender(selectedGender);
        closeModal();
    };
    console.log(selectedGender);
    return (
        <div className="gender-popup">
            <div className="popup-header">
                <h2>Your Smoking Habbit</h2>
                <button className="close-button" onClick={closeModal}>
                    &rarr;
                </button>
            </div>
            <div className="gender-lists">
                {GenderList.map((item) => (
                    <label key={item} className="lists-items">
                        <input
                            type="radio"
                            value={item}
                            checked={selectedGender === item}
                            onChange={() => setSelectedGenderInModel(item)}
                        />
                        {item}
                    </label>
                ))}
            </div>
            <button className="btn" onClick={handleSubmit}>
                Next
            </button>
        </div>
    );
};

export default Gender;
