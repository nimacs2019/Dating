import React, { useState } from "react";
import "./Hobbies.scss";



const Hobbies = ({ closeModal,setSelectedHobbies }) => {

    const hobbiesList = ["Reading", "Traveling", "Cooking", "Sports", "Music"];
    
    const [selectedHobbies, setSelectedHobbiesInModel] = useState([]);

    const handleCheckboxChange = (hobby) => {
        setSelectedHobbiesInModel((prevSelectedHobbies) =>
            prevSelectedHobbies.includes(hobby)
                ? prevSelectedHobbies.filter((h) => h !== hobby)
                : [...prevSelectedHobbies, hobby]
        );
    };

    console.log(selectedHobbies);

    const handleSubmit = () => {
        setSelectedHobbies(selectedHobbies);
        closeModal();
    };

    return (
        <div className="hobbies-popup">
            <div className="popup-header">
                <h2>Your Hobbies</h2>
                <button className="close-button" onClick={closeModal}>
                    &rarr;
                </button>
            </div>
            <div className="hobbies-list">
                {hobbiesList.map((hobby) => (
                    <label key={hobby} className="hobby-item">
                        <input
                            type="checkbox"
                            value={hobby}
                            checked={selectedHobbies.includes(hobby)}
                            onChange={() => handleCheckboxChange(hobby)}
                        />
                        {hobby}
                    </label>
                ))}
            </div>
            <button className="btn" onClick={handleSubmit}>Next</button>
        </div>
    );
};

export default Hobbies;
