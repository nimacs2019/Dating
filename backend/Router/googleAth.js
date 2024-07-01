const express = require("express");
const router = express.Router();
const passport = require("passport");
const { checkUserType } = require("../Middlewares/passportGoogleAuth");
require("../Middlewares/passportGoogleAuth");

// initial google auth login
router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// login
router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:3000/login",
    }),
    checkUserType
);

module.exports = router;
