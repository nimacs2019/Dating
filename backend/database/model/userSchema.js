const mongoose = require("mongoose");

const userShema = new mongoose.Schema(
    {
        googleId: String,
        displayName: String,
        email: String,
        image: String,
        firstName: String,
        location: String,
        dob: Date,
        gender: String,
    },
    { timestamps: true }
);

const userDataSchema  = new mongoose.Schema(
    {
        name: String,
        email:String,
        mob:String,
        password:String,
        dob: Date,
        age: String,
        hobbies: [String],
        interests: [String],
        smokingHabbits: String,
        drinkingHabbits: String,
        qualification: String,
        profilepicture: String,
        moreImages: [String],
        reels:String
    },
    { timestamps: true }
);

const User =mongoose.model("users", userShema);
const UserData = mongoose.model("userInformations", userDataSchema);

module.exports = {
    User,
    UserData,
};
