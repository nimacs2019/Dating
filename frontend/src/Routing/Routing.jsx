import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import Header from "../Pages/Header/Header";
import Hero from "../Pages/Hero/Hero";
import SignUpForm from "../Pages/SignUpForm/SignUpForm";
import Otp from "../Pages/Otp/Otp";
import Login from "../Pages/Login/Login";
import RelationType from "../Pages/RelationType/RelationType";
import BasicInfo from "../Pages/BasicInfo/BasicInfo";
import Home from "../Pages/Home/Home";

function Routing() {
    return (
        <div>
            <Header />
            <Routes>
            
                <Route exact path="/" element={<Hero />} Home />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/otp" element={<Otp />} />
                <Route path="/relationType" element={<RelationType />} />
                <Route path="/relationType/basicInfo" element={<BasicInfo />} />
                <Route path="/home" element={<Home />} />


            </Routes>
        </div>
    );
}

export default Routing;