import React, { useState } from "react";
import "./Qualification.scss";

const Qualification = ({ closeModal, setSelectedQualification }) => {
    const qualificationLists = ["10", "PLUS TWO", "UG", "PG", "OTHER"];
    const [selecetedQualification, setSlectedQualificationInModel] = useState();

    const handleSubmit = () => {
        setSelectedQualification(selecetedQualification);
        closeModal();
    };

    return (
        <div className="qualification-popup">
            <div className="popup-header">
                <h2>Your Higher Qualification</h2>
                <button className="close-button" onClick={closeModal}>
                    &rarr;
                </button>
            </div>
            <div className="qualification-lists">
                {qualificationLists.map((item) => (
                    <label key={item} className="qualification-items">
                        <input
                            type="radio"
                            value={item}
                            checked={selecetedQualification === item}
                            onChange={() => setSlectedQualificationInModel(item)}
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

export default Qualification;
