import React from "react";
import "./Home.scss";


function getRandomImage() {
    // Array of image URLs
    const images = [
        "https://images.unsplash.com/photo-1621621667797-e06afc217fb0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1508414694446-9c6188b8eacd?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1588287792348-8fc81e82828d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        // Add more image paths as needed
    ];

    // Generate a random index
    const randomIndex = Math.floor(Math.random() * images.length);

    // Return the random image URL
    return images[randomIndex];
}

function Home1() {
    const backgroundImage = getRandomImage(); // Get a random image URL

    const divStyle = {
        backgroundImage: `url(${backgroundImage})`, // Use the random image URL
    };

    return (
        <div className="home1-background" style={divStyle}>
            
        </div>
    );
}

export default Home1;
