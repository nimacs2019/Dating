import React, { useState } from "react";
import "./SmokingHabbits.scss";

const SmokingHabbits = ({ closeModal, setSelectedSmokingHabbits }) => {
    const lists = ["No", "Yes", "Planning to Quit"];

    const [selectedSmokingHabbits, setSelectedSmokingHabbitsInModel] = useState();

    const handleSubmit = () => {
        setSelectedSmokingHabbits(selectedSmokingHabbits);
        closeModal();
    };

    console.log(selectedSmokingHabbits);

    return (
        <div className="smokingHabbit-popup">
            <div className="popup-header">
                <h2>Your Smoking Habbit</h2>
                <button className="close-button" onClick={closeModal}>
                    &rarr;
                </button>
            </div>
            <div className="smoking-habbits-lists">
                {lists.map((item) => (
                    <label key={item} className="lists-items">
                        <input
                            type="radio"
                            value={item}
                            checked={selectedSmokingHabbits === item}
                            onChange={() => setSelectedSmokingHabbitsInModel(item)}
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

export default SmokingHabbits;
