import React, { useState } from "react";
import "./Job.scss";

const Job = ({ closeModal, setSelectedJob }) => {
    const jobList = [
        "Software Engineer",
        "Doctor",
        "Teacher",
        "Nurse",
        "Electrician",
        "Carpenter",
        "Accountant",
        "Lawyer",
        "Chef",
        "Marketing Manager",
        "Sales Representative",
        "Project Manager",
        "Graphic Designer",
        "Other",
    ];
    const [selectedJob, setSelectedJobInModel] = useState([]);
    const handleSubmit = () => {
        setSelectedJob(selectedJob);
        closeModal();
    };

    return (
        <div className="job-popup">
            <div className="popup-header">
                <h2>Your Districs</h2>
                <button className="close-button" onClick={closeModal}>
                    &rarr;
                </button>
            </div>
            <div className="job-lists">
                {jobList.map((item) => (
                    <label key={item} className="lists-items">
                        <input
                            type="radio"
                            value={item}
                            checked={selectedJob === item}
                            onChange={() => setSelectedJobInModel(item)}
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

export default Job;
