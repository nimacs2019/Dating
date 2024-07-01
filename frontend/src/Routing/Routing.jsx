import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "../Pages/Header/Header";
import SignUpForm from "../Pages/SignUpForm/SignUpForm";
import Otp from "../Pages/Otp/Otp";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import RelationType from "../Pages/RelationType/RelationType";
import SelectGender from "../Pages/SelectGender/SelectGender";
import MoreAboutUser from "../Pages/MoreAboutUser/MoreAboutUser";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Home from "../Pages/Home/Home";
import Home1 from "../Pages/Home/Home1";
import { ModelContextProvider } from "../ModelContextProvider/ModelContextProvider";
import Model from "../ModelContextProvider/Model";
import Employment from "../Pages/Employment/Employment";

function Routing() {
    const location = useLocation();
    return (
        <>
            <ModelContextProvider>
                {location.pathname === "/" ? (
                    <>
                        <Home />
                        <Header />
                    </>
                ) : (
                    <>
                        <Header />
                        <Home1 />
                    </>
                )}

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUpForm />} />
                    <Route path="/otp" element={<Otp />} />
                    <Route path="/registration" element={<Registration />} />
                    <Route path="/employment/relationType" element={<RelationType />} />
                    <Route path="/relationType/basicUserData" element={<Home />} />
                    <Route path="/add-detailed-data" element={<MoreAboutUser />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/selectgender" element={<SelectGender/>} />
                    <Route path="/employment" element={<Employment/>}/>
                </Routes>
                <Model/>
            </ModelContextProvider>
        </>
    );
}

export default Routing;
