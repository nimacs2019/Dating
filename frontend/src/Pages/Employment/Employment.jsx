import React, { useState } from "react";
import "./Employment.scss";
import { useNavigate } from "react-router-dom";

const Employment = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const navigate = useNavigate()

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleSubmit = ()=>{
        navigate('./relationType')
    }

    return (
        <div className="form-container">
            <h1>Choose Employment Type</h1>
            <div className="radio-buttons">
                <label>
                    <input
                        type="radio"
                        value="Employee"
                        checked={selectedOption === "Employee"}
                        onChange={handleOptionChange}
                    />
                    Employee
                </label>
                <label>
                    <input
                        type="radio"
                        value="Employer"
                        checked={selectedOption === "Employer"}
                        onChange={handleOptionChange}
                    />
                    Employer
                </label>
                <label>
                    <input
                        type="radio"
                        value="Jobseeker"
                        checked={selectedOption === "Jobseeker"}
                        onChange={handleOptionChange}
                    />
                    Jobseeker
                </label>
            </div>

            {selectedOption === "Employee" || selectedOption === "Employer" ? (
                <div className="form-section">
                    <h2>Fill the Form</h2>
                    <form>
                        <div>
                            <label>Company Name:</label>
                            <input type="text" name="companyName" />
                        </div>
                        <div>
                            <label>Designation:</label>
                            <input type="text" name="designation" />
                        </div>
                        <div>
                            <label>Location:</label>
                            <input type="text" name="location" />
                        </div>
                    </form>
                </div>
            ) : null}

            {selectedOption === "Jobseeker" ? (
                <div className="form-section">
                    <h2>Expertise Level</h2>
                    <div className="radio-buttons">
                        <label>
                            <input type="radio" value="Fresher" name="expertise" />
                            Fresher
                        </label>
                        <label>
                            <input type="radio" value="Intermediate" name="expertise" />
                            Intermediate
                        </label>
                        <label>
                            <input type="radio" value="Experienced" name="expertise" />
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
