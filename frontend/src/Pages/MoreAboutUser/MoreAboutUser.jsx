import React, { useState } from "react";
import "./MoreAboutUser.scss";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import {
    FaUser,
    FaGraduationCap,
    FaHeartbeat,
    FaCross,
    FaUsers,
    FaLanguage,
    FaSmoking,
    FaGlassCheers,
    FaStar,
    FaImage,
} from "react-icons/fa";

const MoreAboutUser = () => {
    const [formData, setFormData] = useState({
        hobbies: [],
        education: "",
        status: "",
        faith: "",
        community: "",
        motherTongue: "",
        smoking: "",
        drinking: "",
        interest: [],
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAdd = (field) => {
        setFormData({
            ...formData,
            [field]: [...formData[field], ""],
        });
    };
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            images: [...formData.images, ...Array.from(e.target.files)],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("./dashboard");
        console.log(formData);
    };

    return (
        <div className="form-container">
            <h2>More About You</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <div className="icon">
                            {" "}
                            <FaUser />
                        </div>
                        <div className="input-with-button">
                            <input
                                type="text"
                                name="hobbies"
                                placeholder="Hobbies"
                                value={formData.hobbies}
                                onChange={handleChange}
                            />
                            <button className="btn" type="button" onClick={() => handleAdd("hobbies")}>
                                Add
                            </button>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="icon">
                            <FaGraduationCap />
                        </div>
                        <input
                            type="text"
                            name="education"
                            placeholder="Education"
                            value={formData.education}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <div className="icon">
                            <FaHeartbeat />
                        </div>
                        <input
                            type="text"
                            name="status"
                            placeholder="Status"
                            value={formData.status}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <div className="icon">
                            <FaCross />
                        </div>
                        <input
                            type="text"
                            name="faith"
                            placeholder="Faith"
                            value={formData.faith}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <div className="icon">
                            <FaUsers />
                        </div>
                        <input
                            type="text"
                            name="community"
                            placeholder="Community"
                            value={formData.community}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <div className="icon">
                            <FaLanguage />
                        </div>
                        <input
                            type="text"
                            name="motherTongue"
                            placeholder="Mother Tongue"
                            value={formData.motherTongue}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <div className="icon">
                            <FaSmoking />
                        </div>
                        <input
                            type="text"
                            name="smoking"
                            placeholder="Smoking"
                            value={formData.smoking}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <div className="icon">
                            <FaGlassCheers />
                        </div>
                        <input
                            type="text"
                            name="drinking"
                            placeholder="Drinking"
                            value={formData.drinking}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <div className="icon">
                            <FaStar />
                        </div>
                        <div className="input-with-button">
                            <input
                                type="text"
                                name="interest"
                                placeholder="Interest"
                                value={formData.interest}
                                onChange={handleChange}
                            />
                            <button className="btn" type="button" onClick={() => handleAdd("interest")}>
                                Add
                            </button>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="icon">
                            <FaImage />
                        </div>
                        <input style={{ width: "50%" }} type="file" multiple name="images" onChange={handleFileChange} />
                    </div>
                </div>

                <button className="btn" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default MoreAboutUser;
