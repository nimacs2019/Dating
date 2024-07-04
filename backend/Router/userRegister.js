const express = require("express");
const upload = require("../Middlewares/multer");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../database/model/userSchema");
const UserData = require("../database/model/userDataSchema");

router.post(
    "/api/registration",
    upload.fields([
        { name: "profilePicture", maxCount: 1 },
        { name: "moreImages", maxCount: 5 },
        { name: "reels", maxCount: 1 },
    ]),
    async (req, res) => {
        console.log("User entered details:", req.body);
        console.log("User entered Image files:", req.files);

        const { name, email, mob, password, dob, age, hobbies, interests, smokingHabits, drinkingHabits, qualification } =
            req.body;

        try {
            let user = await User.findOne({ $or: [{ email }, { mob }] });

            if (user) {
                user.displayName = name;
                user.mob = mob;
                user.email = email;
                if (password) {
                    user.password = await bcrypt.hash(password, 10);
                }

                console.log("Updated Details:", user.displayName, user.mob, user.email, user.password);
                await user.save();

                const userData = {
                    name,
                    email,
                    mob,
                    password: await bcrypt.hash(password, 10),
                    dob,
                    age,
                    hobbies,
                    interests,
                    smokingHabits,
                    drinkingHabits,
                    qualification,
                };

                if (req.files.profilePicture) {
                    userData.profilePicture = req.files.profilePicture[0].path;
                }
                if (req.files.moreImages) {
                    userData.moreImages = req.files.moreImages.map((file) => file.path);
                }
                if (req.files.reels) {
                    userData.reels = req.files.reels[0].path;
                }

                const newUser = new UserData(userData);
                await newUser.save();
                return res.status(201).json(newUser);
            } else {
                return res.status(404).json({ message: "User does not exist" });
            }
        } catch (error) {
            console.error("Error:", error);
            return res.status(500).json({ error: error.message });
        }
    }
);

module.exports = router;
