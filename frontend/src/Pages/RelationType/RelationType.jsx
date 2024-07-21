import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RelationType.scss";

function RelationType() {
    const [relationshipType, setRelationshipType] = useState("");
    const navigate = useNavigate();

    const handleRelationshipChange = (event) => {
        setRelationshipType(event.target.value);
    };
    const handleNext = async () => {
        if (!relationshipType) {
            alert("Please select any option regarding the duration of the relationship");
        }

        if (relationshipType === "short-term") {
            try {
                const response = await axios.post(
                    "http://localhost:8080/api/relationship-Duration",
                    { relationshipType: relationshipType },
                    { withCredentials: true }
                );
                if (response.data.success) {
                    navigate("/selectgender");
                } else {
                    console.log("Error in submitting data");
                }
            } catch (error) {
                console.error("Error :", error.message);
            }
        } else if (relationshipType === "long-term") {
            if (window.confirm("Do you want to visit the matrimony page?")) {
                navigate("/matrimony-splash");
            }
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
