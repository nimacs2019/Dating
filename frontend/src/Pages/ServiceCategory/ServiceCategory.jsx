import React, { useState } from "react";
import "./ServiceCategory.scss";
import { useNavigate } from "react-router-dom";

const ServiceCategory = () => {
    const navigate = useNavigate();

    const handleClick = (category) => {
        category === "Dating" && navigate("/employment");
    };

    return (
        <>
            <div className="category-container">
                <div className="container">
                    <button className="btn" onClick={(e) => handleClick("Dating")}>
                        Dating{" "}
                    </button>
                    <button className="btn" onClick={() => handleClick()}>
                        Matrimony
                    </button>
                    <button className="btn" onClick={() => handleClick()}>
                        Job Portal
                    </button>
                    <button className="btn" onClick={() => handleClick()}>
                        Study Abroad
                    </button>
                    <button className="btn" onClick={() => handleClick()}>
                        Ecommerce
                    </button>
                </div>
            </div>
        </>
    );
};

export default ServiceCategory;
