import React, { useContext, useState } from "react";
import "./Home.scss";
import SignUpForm from "../SignUpForm/SignUpForm";
import { ModalContext } from "../../ModelContextProvider/ModelContextProvider";

function Home() {
    const { isOpen,openModal  } = useContext(ModalContext);
    console.log('hellooooooooo',isOpen);

    const handleOpenModal = () => {
        openModal (<SignUpForm />);
    };

    return (
        <section className="home">
            <div className="secContainer container">
                <div className="homeText">
                    <h1 className="title">
                        Are you <span>wating </span>for <span>dating</span>
                    </h1>{" "}
                    <p className="subTitle">Lorem ipsum, dolor sit amet consectetur</p>
                    <button style={{ color: "white" }} className="btn" onClick={handleOpenModal}>
                        Explore Now
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Home;
