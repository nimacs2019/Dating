const express = require("express");
const router = express.Router();
const passport = require("passport");
const { checkUserType } = require("../Middlewares/passportGoogleAuth");
require("../Middlewares/passportGoogleAuth");
const jwt = require("jsonwebtoken");

// initial google auth login
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// login
router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:3000/login",
    }),
    async (req, res, next) => {
        try {
            const user = req.user;
            // Generate JWT Token
            const token = jwt.sign({ userid: user._id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1d' });
            console.log('New Token ',token);
            console.log("Setting cookies for user:", user);

            if (!token) {
                return res.status(404).json({ message: 'Token not found' });
              }

            // Set the JWT token in a cookie
            res.cookie("jwt", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            });
            res.cookie("userEmail", user.email, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            });
            res.cookie("userid", user._id.toString(), {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
            });
            // Check user type and redirect accordingly
            checkUserType(req, res, next);
        } catch (error) {
            console.error("Error in Google auth callback:", error);
            res.redirect("http://localhost:3000/login");
        }
    }
);

module.exports = router;