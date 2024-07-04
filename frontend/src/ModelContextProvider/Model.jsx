import React, { useContext } from "react";
import { ModalContext } from "./ModelContextProvider";
import "./Model.scss"

const Model = () => {
    const { isOpen, closeModal, content } = useContext(ModalContext);

    if (!isOpen) return null;

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <button className="closeButton" onClick={closeModal}>
                    ×
                </button>
                {content}
            </div>
        </div>
    );
};

export default Model;
