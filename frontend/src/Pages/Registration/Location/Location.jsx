import React, { useState } from "react";
import "./Location.scss";

const Location = ({ closeModal, setSelectedLocation }) => {
    const DistrictList = [
        "Alappuzha",
        "Ernakulam",
        "Idukki",
        "Kannur",
        "Kasaragod",
        "Kollam",
        "Kottayam",
        "Kozhikode",
        "Malappuram",
        "Palakkad",
        "Pathanamthitta",
        "Thiruvananthapuram",
        "Thrissur",
        "Wayanad",
    ];
    const [selectedLocation, setSelectedLocationInModel] = useState([]);

    const handleSubmit = () => {
        setSelectedLocation(selectedLocation);
        closeModal();
    };
    console.log(selectedLocation);
    return (
        <div className="districs-popup">
            <div className="popup-header">
                <h2>Your Districs</h2>
                <button className="close-button" onClick={closeModal}>
                    &rarr;
                </button>
            </div>
            <div className="districs-lists">
                {DistrictList.map((item) => (
                    <label key={item} className="lists-items">
                        <input
                            type="radio"
                            value={item}
                            checked={selectedLocation === item}
                            onChange={() => setSelectedLocationInModel(item)}
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

export default Location;
