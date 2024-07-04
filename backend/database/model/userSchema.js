const mongoose = require("mongoose");

const userShema = new mongoose.Schema(
    {
        googleId: String,
        displayName: String,
        email: String,
        firstName: String,
        location: String,
        userType: String,
        userType: String,
        companyName: String,
        designation: String,
        location: String,
        expertiseLevel: String,
        relationshipType: String,
    },
    { timestamps: true }
);

const User = mongoose.model("users", userShema);

module.exports = User;
