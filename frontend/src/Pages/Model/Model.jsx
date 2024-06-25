import React from 'react';
import './Model.css';
// import Login from './Login'; // Import the LoginForm component

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <button className="closeButton" onClick={onClose}>×</button>
                {children} {/* Render the children */}
            </div>
        </div>
    );
};

export default Modal;
