const mongoose = require("mongoose");

const userShema = new mongoose.Schema(
    {
        googleId: String,
        displayName: String,
        email: String,
        image: String,
    },
    { timestamps: true }
);

const userdb = new mongoose.model("users",userShema)

module.exports = userdb;