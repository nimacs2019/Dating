import React from "react";
import { FaHeart, FaTimes } from "react-icons/fa";
import "./Dashboard.scss";

function Dashboard() {
    const users = [
        {
            id: 1,
            name: "John ",
            location: "New York, USA",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        { id: 2, name: "Arun ", location: "London, UK", img: "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: 3, name: "Bob Johnson", location: "Sydney, Australia", img: "https://plus.unsplash.com/premium_photo-1670071482460-5c08776521fe?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: 4, name: "Alice Davis", location: "Tokyo, Japan", img: "https://images.unsplash.com/photo-1678286742832-26543bb49959?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: 5, name: "John ", location: "New York, USA", img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: 6, name: "Bob Johnson", location: "Sydney, Australia", img: "https://images.unsplash.com/photo-1554260570-9140fd3b7614?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: 7, name: "Arun ", location: "London, UK", img: "https://plus.unsplash.com/premium_photo-1664541336896-b3d5f7dec9a3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: 8, name: "Linda Clark", location: "Berlin, Germany", img: "https://plus.unsplash.com/premium_photo-1664541336896-b3d5f7dec9a3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: 9, name: "Daniel Lewis", location: "Barcelona, Spain", img: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: 10, name: "John ", location: "New York, USA", img: "https://images.unsplash.com/photo-1678286742832-26543bb49959?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: 11, name: "Arun ", location: "London, UK", img: "https://plus.unsplash.com/premium_photo-1670071482460-5c08776521fe?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
        { id: 12, name: "Karen Allen", location: "Amsterdam, Netherlands", img: "https://plus.unsplash.com/premium_photo-1664541336896-b3d5f7dec9a3?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    ];
    return (
        <div className="nearby-users">
            <h1>Who's Nearby?</h1>
            <div className="buttons">
                <button className="btn">Distance</button>
                <button className="btn">Job</button>
                <button className="btn">Interest</button>
            </div>
            <div className="cards-container">
                {users.map((user) => (
                    <div key={user.id} className="card">
                        <img src={user.img} alt={user.name} />
                        <div className="card-bottom">
                            <h3>{user.name}</h3>
                            <p>{user.location}</p>
                            {/* <div className="card-icons">
                                <FaHeart className="icon-heart" />
                                <button>View More</button>
                                <FaTimes className="icon-close" />
                            </div> */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;
