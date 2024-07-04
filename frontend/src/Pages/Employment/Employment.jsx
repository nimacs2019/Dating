import React, { useState } from "react";
import "./Employment.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Employment = () => {
    const [employmentType, setEmploymentType] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [designation, setDesignation] = useState("");
    const [location, setLocation] = useState("");
    const [expertiseLevel, setExpertiseLevel] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // navigate("/relationType");

        const employeeDetails =
            employmentType === "Jobseeker"
                ? { employmentType, expertiseLevel }
                : { employmentType, companyName, designation, location };

        console.log("Employement Details ", employeeDetails, { withCredentials: true });
        try {
            const response = await axios.post("http://localhost:8080/api/employment", employeeDetails, {
                
            });
            console.log("Employment Response data:", response.data);
            navigate("/relationType");
        } catch (error) {
            console.error("Error in submitting Employment data:", error);
        }
    };

    return (
        <div className="form-container">
            <h1>Choose Employment Type</h1>
            <div className="radio-buttons">
                <label>
                    <input
                        type="radio"
                        value="Employee"
                        checked={employmentType === "Employee"}
                        onChange={(e) => setEmploymentType(e.target.value)}
                    />
                    Employee
                </label>
                <label>
                    <input
                        type="radio"
                        value="Employer"
                        checked={employmentType === "Employer"}
                        onChange={(e) => setEmploymentType(e.target.value)}
                    />
                    Employer
                </label>
                <label>
                    <input
                        type="radio"
                        value="Jobseeker"
                        checked={employmentType === "Jobseeker"}
                        onChange={(e) => setEmploymentType(e.target.value)}
                    />
                    Jobseeker
                </label>
            </div>

            {employmentType === "Employee" || employmentType === "Employer" ? (
                <div className="form-section">
                    <h2>Fill the Form</h2>
                    <form>
                        <div>
                            <label>Company Name:</label>
                            <input
                                type="text"
                                name="companyName"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Designation:</label>
                            <input
                                type="text"
                                name="designation"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Location:</label>
                            <input
                                type="text"
                                name="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
            ) : null}

            {employmentType === "Jobseeker" ? (
                <div className="form-section">
                    <h2>Expertise Level</h2>
                    <div className="radio-buttons">
                        <label>
                            <input
                                type="radio"
                                value="Fresher"
                                name="expertise"
                                checked={expertiseLevel === "Fresher"}
                                onChange={(e) => setExpertiseLevel(e.target.value)}
                            />
                            Fresher
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Intermediate"
                                name="expertise"
                                checked={expertiseLevel === "Intermediate"}
                                onChange={(e) => setExpertiseLevel(e.target.value)}
                            />
                            Intermediate
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Experienced"
                                name="expertise"
                                checked={expertiseLevel === "Experienced"}
                                onChange={(e) => setExpertiseLevel(e.target.value)}
                            />
                            Experienced
                        </label>
                    </div>
                </div>
            ) : null}
            <button onClick={handleSubmit} className="btn" type="submit">
                Next
            </button>
        </div>
    );
};

export default Employment;
