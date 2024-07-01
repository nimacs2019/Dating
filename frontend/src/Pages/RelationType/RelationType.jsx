import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RelationType.scss";

function RelationType() {
    const [relationshipType, setRelationshipType] = useState("");
    const navigate = useNavigate();

    const handleRelationshipChange = (event) => {
        setRelationshipType(event.target.value);
    };
    const handleNext = () => {
        if (relationshipType === "short-term") {
            navigate("/selectgender");
        } else {
        }
    };
    return (
        <div className="relationship-container">
            <h2>Choose Relationship Type</h2>
            <div className="radio-buttons">
                <label>
                    <input
                        type="radio"
                        value="long-term"
                        checked={relationshipType === "long-term"}
                        onChange={handleRelationshipChange}
                    />
                    Long-term Relationship
                    {relationshipType === "long-term" && <p>"You will be redirected to our matrimonial application."</p>}
                </label>
                <label>
                    <input
                        type="radio"
                        value="short-term"
                        checked={relationshipType === "short-term"}
                        onChange={handleRelationshipChange}
                    />
                    Short-term Relationship
                    {relationshipType === "short-term" && <p>"You will be redirected to our dating application."</p>}
                </label>
            </div>
            <button className="btn" onClick={handleNext}>
                Next
            </button>
        </div>
    );
}

export default RelationType;
