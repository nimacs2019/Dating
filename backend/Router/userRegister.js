const express = require("express");
const upload = require('../Middlewares/multer')
const router = express.Router();
const bcrypt = require('bcrypt')
const { User, UserData } = require("../database/model/userSchema");

// Create a User (register)
router.post(
    "/api/registration",
    upload.fields([
        { name: "profilePicture", maxCount: 1 },
        { name: "moreImages", maxCount: 5 },
        { name: "reels", maxCount: 1 }
    ]),
    async (req, res) => {
        console.log("User entered details  ", req.body);
        console.log("User entered Image files  ",req.files);
        const { email, phone, ...userData } = req.body;

        if (!email && !phone) {
            return res.status(400).json({ message: "Email or phone is required" });
        }

        try {
            // Check if the user already exists
            let user = await User.findOne({ $or: [{ email }, { phone }] });

            if (user) {
                user.name = req.body.name
                user.mob = req.body.mob;
                user.email = req.body.email;
                user.password = await bcrypt.hash(password,10)
                console.log('Updated Details ',user.name,user.mob,user.email,user.password);
                return res.status(400).json({ message: "User already exists" });
            } else {
                if (req.files.profilePicture) {
                    userData.profilePicture = req.files.profilePicture[0].path;
                }
                if (req.files.moreImages) {
                    userData.moreImages = req.files.moreImages.map((file) => file.path);
                }
                if (req.files.reels) {
                    userData.reels = req.files.reels[0].path;
                }
                // Create a new user
                user = new UserData({ email, phone, ...userData });
                await user.save();
                return res.status(201).json(user);
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
);

module.exports = router;
