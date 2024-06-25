import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.scss";
import Model from "../Model/Model";
import Login from "../Login/Login";
import SignUpForm from "../SignUpForm/SignUpForm";

function Hero() {
    // const [gender, setGender] = useState("men");
    // const [seeking, setSeeking] = useState("women");
    // const [ageFrom, setAgeFrom] = useState(20);
    // const [ageTo, setAgeTo] = useState(50);

    // const handleSearch = () => {
    //     // Handle the search logic here
    //     console.log(`I am ${gender}, seeking ${seeking} from ${ageFrom} to ${ageTo}`);
    // };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <section className="hero">
            <div className="secContainer container">
                <div className="heroText">
                    <h1 className="title">datin.............</h1>{" "}
                    <p className="subTitle">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit vitae, consequuntur distinctio
                        facere asperiores placeat? Nisi inventore
                    </p>
                    <button className="btn" onClick={openModal}>
                        Explre Now
                    </button>
                </div>

                {/* <div className="search-container">
                    <div className="search-item">
                        <label>I am </label>
                        <select value={gender} onChange={(e) => setGender(e.target.value)}>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                        </select>
                    </div>

                    <div className="search-item">
                        <label>seeking </label>
                        <select value={seeking} onChange={(e) => setSeeking(e.target.value)}>
                            <option value="women">Women</option>
                            <option value="men">Men</option>
                            <option value="both">Both</option>
                        </select>
                    </div>

                    <div className="search-item">
                        <label>from </label>
                        <select value={ageFrom} onChange={(e) => setAgeFrom(e.target.value)}>
                            {Array.from({ length: 81 - 18 }, (_, i) => i + 18).map((age) => (
                                <option key={age} value={age}>
                                    {age}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="search-item">
                        <label>to </label>
                        <select value={ageTo} onChange={(e) => setAgeTo(e.target.value)}>
                            {Array.from({ length: 81 - 18 }, (_, i) => i + 18).map((age) => (
                                <option key={age} value={age}>
                                    {age}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="btn" onClick={handleSearch}>
                        Search
                    </button>
                </div> */}
            </div>

            <Model isOpen={isModalOpen} onClose={closeModal}>
                <SignUpForm /> {/* Pass the LoginForm as children */}
            </Model>
        </section>
    );
}

export default Hero;
