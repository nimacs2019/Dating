import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    FaUser,
    FaCalendarAlt,
    FaHeart,
    FaLightbulb,
    FaSmoking,
    FaWineGlassAlt,
    FaGraduationCap,
    FaImage,
    FaVideo,
    FaEnvelope,
    FaLock,
    FaPhone,
    FaGenderless,
    FaArrowCircleRight,
    FaMapMarkerAlt,
    FaMars,
    FaBriefcase,
    FaUserTie,
    FaHardHat,
} from "react-icons/fa";
import "./Registration.scss";
import { ModalContext } from "../../ModelContextProvider/ModelContextProvider";
import Hobbies from "./Hobbies/Hobbies";
import Interests from "./Interests/Interests";
import SmokingHabbits from "./SmokingHabbits/SmokingHabbits";
import DrinkingHabbits from "./DrinkingHabbits/DrinkingHabbits";
import Qualification from "./Qualification/Qualification";
import Gender from "./Gender/Gender";
import Location from "./Location/Location";
import Job from "./Job/Job";

const Registration = () => {
    const { openModal, closeModal } = useContext(ModalContext);
    const fileInputRefProfile = useRef(null);
    const fileInputRefMoreImages = useRef(null);
    const fileInputRefReels = useRef(null);
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);
    const [moreImagesPreviews, setMoreImagesPreviews] = useState([]);
    const [reelsPreviews, setReelsPreviews] = useState([]);

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        mob: "",
        password: "",
        confirmPassword: "",
        dob: "",
        age: "",
        gender: "",
        dist: "",
        hobbies: [],
        interests: [],
        smokingHabits: "",
        drinkingHabits: "",
        qualification: "",
        job: "",
        profilePicture: null,
        moreImages: [],
        reels: [],
    });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
        console.log("Input values ", userData);
    };

    const validate = () => {
        const newErrors = {};

        if (!userData.name.trim()) {
            newErrors.name = "Name is required";
        }
        if (!userData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            newErrors.email = "Email address is invalid";
        }
        if (!userData.mob) {
            newErrors.mob = "Phone number is required";
        } else if (!/^\d{10}$/.test(userData.mob)) {
            newErrors.mob = "Phone number is invalid";
        }
        if (!userData.password) {
            newErrors.password = "Password is required";
        }
        if (!userData.confirmPassword) {
            newErrors.confirmPassword = "Confirm Password is required";
        } else if (userData.password !== userData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        if (!userData.dob) {
            newErrors.dob = "Date of Birth is required";
        }
        if (!userData.gender) {
            newErrors.gender = "Gender is required";
        }
        if (!userData.dist) {
            newErrors.dist = "Location is required";
        }

        return newErrors;
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        console.log("Selected files:", files);

        if (name === "profilePicture") {
            const file = files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    console.log("FileReader result:", reader.result);
                    setProfilePicturePreview(reader.result); // Set single preview for profile picture
                };
                reader.readAsDataURL(file);
                setUserData((prevData) => ({
                    ...prevData,
                    profilePicture: file,
                }));
            } else {
                setProfilePicturePreview(null);
            }
        } else if (name === "moreImages") {
            const newFiles = Array.from(files);
            const newPreviewUrls = newFiles.map((file) => URL.createObjectURL(file));
            setMoreImagesPreviews((prevUrls) => [...prevUrls, ...newPreviewUrls]);
            setUserData((prevData) => ({
                ...prevData,
                moreImages: [...(prevData.moreImages || []), ...newFiles],
            }));
        } else if (name === "reels") {
            const newFiles = Array.from(files);
            const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
            setReelsPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
            setUserData((prevData) => ({
                ...prevData,
                reels: [...(prevData.reels || []), ...newFiles],
            }));
        }
    };

    const handleHobbies = () => {
        openModal(
            <Hobbies
                closeModal={closeModal}
                setSelectedHobbies={(hobbies) => setUserData((prevData) => ({ ...prevData, hobbies }))}
            />
        );
    };

    const handleInterests = () => {
        openModal(
            <Interests
                closeModal={closeModal}
                setSelectedInterests={(interests) => setUserData((prevData) => ({ ...prevData, interests }))}
            />
        );
    };

    const handleSmokingHabbits = () => {
        openModal(
            <SmokingHabbits
                closeModal={closeModal}
                setSelectedSmokingHabbits={(smokingHabits) => setUserData((prevData) => ({ ...prevData, smokingHabits }))}
            />
        );
    };

    const handleGender = () => {
        openModal(
            <Gender
                closeModal={closeModal}
                setSelectedGender={(gender) => setUserData((prevData) => ({ ...prevData, gender }))}
            />
        );
    };

    const handleJob = () => {
        openModal(
            <Job closeModal={closeModal} setSelectedJob={(job) => setUserData((prevData) => ({ ...prevData, job }))} />
        );
    };

    const handleLocation = () => {
        openModal(
            <Location
                closeModal={closeModal}
                setSelectedLocation={(dist) => setUserData((prevData) => ({ ...prevData, dist }))}
            />
        );
    };

    const handleDrinkingHabbits = () => {
        openModal(
            <DrinkingHabbits
                closeModal={closeModal}
                setSelectedDrinkingHabbits={(drinkingHabits) =>
                    setUserData((prevData) => ({ ...prevData, drinkingHabits }))
                }
            />
        );
    };

    const handleQualification = () => {
        openModal(
            <Qualification
                closeModal={closeModal}
                setSelectedQualification={(qualification) => setUserData((prevData) => ({ ...prevData, qualification }))}
            />
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("this is my user data", userData);

        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const formData = new FormData();

        formData.append("name", userData.name);
        formData.append("email", userData.email);
        formData.append("mob", userData.mob);
        formData.append("password", userData.password);
        formData.append("Confirm password", userData.confirmPassword);
        formData.append("dob", userData.dob);
        formData.append("age", userData.age);
        formData.append("gender", userData.gender);
        formData.append("dist", userData.dist);
        formData.append("hobbies", JSON.stringify(userData.hobbies));
        formData.append("interests", JSON.stringify(userData.interests));
        formData.append("smokingHabits", userData.smokingHabits);
        formData.append("drinkingHabits", userData.drinkingHabits);
        formData.append("qualification", userData.qualification);
        formData.append("job", userData.job);
        formData.append("profilePicture", userData.profilePicture);
        if (userData.moreImages) {
            userData.moreImages.forEach((image) => formData.append("moreImages", image));
        }
        userData.reels.forEach((reel) => formData.append("reels", reel));

        for (let pair of formData.entries()) {
            console.log(pair[0] + ", " + pair[1]);
        }

        try {
            const response = await axios.post("http://localhost:8080/api/registration", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            console.log("Response status:", response.status);
            if (response.status === 201) {
                console.log("submitted successfully");
                alert("submitted successfully");
                navigate("/service-category");
            }
        } catch (error) {
            console.error("Error :", error.message);
        }
    };

    return (
        <div className="registration-container">
            <h2>Registration Form</h2>
            <form className="registration-form">
                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaUser />
                        </div>
                        <input
                            placeholder="Name:"
                            type="text"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaEnvelope />
                        </div>
                        <input
                            onChange={handleInputChange}
                            placeholder="Email:"
                            type="email"
                            value={userData.email}
                            name="email"
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </label>
                    <label>
                        <div className="icon">
                            <FaPhone />
                        </div>
                        <input
                            onChange={handleInputChange}
                            placeholder="Phone Number:"
                            type="text"
                            value={userData.mob}
                            name="mob"
                        />
                        {errors.mob && <span className="error">{errors.mob}</span>}
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaLock />
                        </div>
                        <input
                            onChange={handleInputChange}
                            placeholder="Password:"
                            type="password"
                            value={userData.password}
                            name="password"
                        />
                         {errors.password && <span className="error">{errors.password}</span>}
                    </label>
                    <label>
                        <div className="icon">
                            <FaLock />
                        </div>
                        <input
                            onChange={handleInputChange}
                            placeholder="Confirm Password:"
                            value={userData.confirmPassword}
                            type="password"
                            name="confirmPassword"
                        />
                               {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaCalendarAlt />
                        </div>
                        <input
                            placeholder="DOB:"
                            type="date"
                            name="dob"
                            value={userData.dob}
                            onChange={handleInputChange}
                        />
                         {errors.dob && <span className="error">{errors.dob}</span>}
                   
                    </label>
                    <label>
                        <div className="icon">
                            <FaCalendarAlt />
                        </div>
                        <input
                            placeholder="Age:"
                            type="number"
                            name="age"
                            value={userData.age}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaMars />
                        </div>
                        <input
                            onClick={handleGender}
                            placeholder="Gender:"
                            type="text"
                            value={userData.gender}
                            name="hobbies"
                            readOnly
                        />
                        {errors.gender && <span className="error">{errors.gender}</span>}
                   
                    </label>
                    <label>
                        <div className="icon">
                            <FaMapMarkerAlt />
                        </div>
                        <input
                            onClick={handleLocation}
                            placeholder="Location :"
                            value={userData.dist}
                            type="text"
                            name="location"
                            readOnly
                        />
                          {errors.dist && <span className="error">{errors.dist}</span>}
                   
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaHeart />
                        </div>
                        <input
                            onClick={handleHobbies}
                            placeholder="Hobbies:"
                            type="text"
                            value={userData.hobbies.join(", ")}
                            name="hobbies"
                            readOnly
                        />
                    </label>
                    <label>
                        <div className="icon">
                            <FaLightbulb />
                        </div>
                        <input
                            onClick={handleInterests}
                            placeholder="Interest:"
                            value={userData.interests.join(", ")}
                            type="text"
                            name="interests"
                            readOnly
                        />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaSmoking />
                        </div>
                        <input
                            type="text"
                            name="smokingHabits"
                            placeholder="Smoking Habits:"
                            value={userData.smokingHabits}
                            onClick={handleSmokingHabbits}
                            readOnly
                        />
                    </label>
                    <label>
                        <div className="icon">
                            <FaWineGlassAlt />
                        </div>
                        <input
                            type="text"
                            name="drinkingHabits"
                            value={userData.drinkingHabits}
                            onClick={handleDrinkingHabbits}
                            placeholder="Drinking Habits:"
                            readOnly
                        />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaGraduationCap />
                        </div>
                        <input
                            type="text"
                            name="qualification"
                            placeholder="Higher Qualification:"
                            value={userData.qualification}
                            onClick={handleQualification}
                            readOnly
                        />
                    </label>
                    <label>
                        <div className="icon">
                            <FaUserTie />
                        </div>
                        <input
                            type="text"
                            name="qualification"
                            placeholder="Occupation :"
                            value={userData.job}
                            onClick={handleJob}
                            readOnly
                        />
                    </label>
                </div>
                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaImage />
                        </div>
                        Add Profile Picture:
                        <input
                            type="file"
                            name="profilePicture"
                            accept="image/*"
                            ref={fileInputRefProfile}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        <button className="btn" type="button" onClick={() => fileInputRefProfile.current.click()}>
                            <FaArrowCircleRight />
                        </button>
                    </label>
                    <div className="preview-container">
                        {profilePicturePreview ? (
                            <img src={profilePicturePreview} alt="Profile Preview" className="preview-image" />
                        ) : (
                            <span className="preview-placeholder">No profile picture selected</span>
                        )}
                    </div>
                </div>
                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaImage />
                        </div>
                        Add More Images:
                        <input
                            type="file"
                            name="moreImages"
                            accept="image/*"
                            style={{ display: "none" }}
                            multiple
                            onChange={handleFileChange}
                            ref={fileInputRefMoreImages}
                        />
                        <button className="btn" type="button" onClick={() => fileInputRefMoreImages.current.click()}>
                            <FaArrowCircleRight />
                        </button>
                    </label>
                    <div className="preview-containerMoreImages">
                        {moreImagesPreviews.length > 0 ? (
                            moreImagesPreviews.map((url, index) => (
                                <img key={index} src={url} alt={`More Preview ${index}`} className="preview-image" />
                            ))
                        ) : (
                            <span className="preview-placeholder">you can add upto 5 images</span>
                        )}
                    </div>
                </div>
                <div className="form-row">
                    <label>
                        <div className="icon">
                            <FaVideo />
                        </div>
                        Add Short Reels: &nbsp;
                        <input
                            type="file"
                            name="reels"
                            accept="video/*"
                            ref={fileInputRefReels}
                            style={{ display: "none" }}
                            multiple
                            onChange={handleFileChange}
                        />
                        <button className="btn" type="button" onClick={() => fileInputRefReels.current.click()}>
                            <FaArrowCircleRight />
                        </button>
                    </label>
                    <div className="preview-containerReels">
                        {reelsPreviews.length > 0 ? (
                            reelsPreviews.map((url, index) => (
                                <video key={index} src={url} controls className="preview-video" />
                            ))
                        ) : (
                            <span className="preview-placeholder">No reels selected</span>
                        )}
                    </div>
                </div>
                <div className="form-row">
                    <button onClick={handleSubmit} className="btn" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};
export default Registration;
