const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        mob: String,
        password: String,
        dob: Date,
        age: String,
        hobbies: [String],
        interests: [String],
        smokingHabits: String,
        drinkingHabits: String,
        qualification: String,
        profilePicture: String,
        moreImages: [String],
        reels: [String],
    },
    { timestamps: true }
);

const UserData = mongoose.model("userinformations", userDataSchema);

module.exports = UserData;
