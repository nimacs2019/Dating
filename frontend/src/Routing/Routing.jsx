import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "../Pages/Header/Header";
import SignUpForm from "../Pages/SignUpForm/SignUpForm";
import Otp from "../Pages/Otp/Otp";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import RelationType from "../Pages/RelationType/RelationType";
import SelectGender from "../Pages/SelectGender/SelectGender";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Home from "../Pages/Home/Home";
import Home1 from "../Pages/Home/Home1";
import { ModelContextProvider } from "../ModelContextProvider/ModelContextProvider";
import Model from "../ModelContextProvider/Model";
import Employment from "../Pages/Employment/Employment";
import ServiceCategory from "../Pages/ServiceCategory/ServiceCategory";
import Profile from "../Pages/Profile/Profile";
import SelectedUserProfile from "../Pages/SelectedUserProfile/SelectedUserProfile";
import ChatApplication from "../Pages/ChatApplication/ChatApplication";
import ViewShortList from "../Pages/ViewShortList/ViewShortList";
import ViewSentRequest from "../Pages/ViewSentRequest/ViewSentRequest";
import ViewRequestNotification from "../Pages/ViewRequestNotification/ViewRequestNotification";
import ViewAcceptedRequest from "../Pages/ViewAcceptedRequest/ViewAcceptedRequest";
import ViewRejectedRequest from "../Pages/ViewRejectedRequest/ViewRejectedRequest";
import ViewShortlistedBy from "../Pages/ViewShortlistedBy/ViewShortlistedBy";
import ViewRequestReceived from "../Pages/ViewRequestReceived/ViewRequestReceived"

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
                    <Route path="/relationType" element={<RelationType />} />
                    <Route path="/relationType/basicUserData" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/selectgender" element={<SelectGender />} />
                    <Route path="/employment" element={<Employment />} />
                    <Route path="/service-category" element={<ServiceCategory />} />
                    <Route path="/my-profile" element={<Profile />} />
                    <Route path="/user/:id" element={<SelectedUserProfile />} />
                    <Route path="/chat-application" element={<ChatApplication />} />
                    <Route path="/view-shortlisted" element={<ViewShortList />} />
                    <Route path="/view-shortlistedBy" element={<ViewShortlistedBy />} />
                    <Route path="/view-request-sentList" element={<ViewSentRequest />} />
                    <Route path="/view-request-notification" element={<ViewRequestNotification />} />
                    <Route path="/view-request-accepted" element={<ViewAcceptedRequest />} />
                    <Route path="/view-request-rejected" element={<ViewRejectedRequest />} />
                    <Route path="/view-request-received" element={<ViewRequestReceived />} />
                </Routes>
                <Model />
            </ModelContextProvider>
        </>
    );
}

export default Routing;
