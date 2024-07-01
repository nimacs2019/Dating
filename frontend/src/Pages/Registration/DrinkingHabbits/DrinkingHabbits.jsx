import React, { useState } from "react";
import "./DrinkingHabbits.scss";

const DrinkingHabbits = ({ setSelectedDrinkingHabbits, closeModal }) => {
    const lists = ["Regular", "Planning to quit", "Socially", "Occasionally", "Teetotalar"];
    const [selectedDrinkingHabbits, setSelectedDrinkingHabbitsInModel] = useState();

    const handleSubmit = () => {
        setSelectedDrinkingHabbits(selectedDrinkingHabbits);
        closeModal();
    };

    return (
        <div className="drinkingHabbits-popup">
            <div className="popup-header">
                <h2>Your Drinking Habbit</h2>
                <button className="close-button" onClick={closeModal}>
                    &rarr;
                </button>
            </div>
            <div className="drinking-habbits-lists">
                {lists.map((item) => (
                    <label key={item} className="lists-items">
                        <input
                            type="radio"
                            value={item}
                            checked={selectedDrinkingHabbits === item}
                            onChange={() => setSelectedDrinkingHabbitsInModel(item)}
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

export default DrinkingHabbits;
