import React, { useState } from "react";
import './Interests.scss'

const Interests = ({ closeModal, setSelectedInterests }) => {
    const InterestList = ["Outdoors", "Music", "Food", "Sports", "work"];

    const [selectedInterest, setSelectedInterestInPopup] = useState([]);

    const handleCheckedInterests = (interest) => {
        setSelectedInterestInPopup((prevSelectedInterest) =>
            prevSelectedInterest.includes(interest)
                ? prevSelectedInterest.filter((i) => i !== interest)
                : [...prevSelectedInterest, interest]
        );
    };

    console.log(selectedInterest);

    const handleSubmit = () => {
        setSelectedInterests(selectedInterest);
        closeModal();
    };

    return (
        <div className="interests-popup">
            <div className="popup-header">
                <h2>Your Interests</h2>
                <button className="close-button" onClick={closeModal}>
                    &rarr;
                </button>
            </div>
            <div className="interests-lists">
                {InterestList.map((interest) => (
                    <label key={interest} className="interest-item">
                        <input
                            type="checkbox"
                            value={interest}
                            checked={selectedInterest.includes(interest)}
                            onChange={() => 
                                handleCheckedInterests(interest)}
                        />
                        {interest}
                    </label>
                ))}
            </div>
            <button className="btn" onClick={handleSubmit}>
                Next
            </button>
        </div>
    );
};

export default Interests;
