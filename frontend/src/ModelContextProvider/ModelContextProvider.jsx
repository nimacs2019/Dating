import React, { useState } from "react";

export const ModalContext = React.createContext();

export const ModelContextProvider = ({ children }) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null);

    const openModal = (content) => {
        setContent(content);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setContent(null);
    };

    return <ModalContext.Provider value={{ isOpen, openModal, closeModal, content }}>{children}</ModalContext.Provider>;
};
