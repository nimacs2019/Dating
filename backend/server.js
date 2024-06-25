const express = require("express");
const cors = require("cors");

require("./database/db");
const otpRouter = require("./Route/otpRouter");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;
const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const userdb = require("./database/model/userSchema");

// enable connection with frontent data
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,PUT,POST,DELETE",
        credentials: true,
    })
);

// to parse the json data
app.use(express.json());

// set up session
app.use(
    session({
        secret: "OneNotOne",
        resave: false,
        saveUninitialized: true,
    })
);

// setUp passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new OAuth2Strategy(
        {
            clientID: process.env.Client_ID,
            clientSecret: process.env.Client_Secret,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("profile", profile);
            try {
                let user = await userdb.findOne({ googleId: profile.id });

                if (!user) {
                    user = new userdb({
                        googleId: profile.id,
                        displayName: profile.displayName,
                        email: profile.email[0].value,
                        image: profile.photos[0].value,
                    });

                    await user.save();
                }
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use("/", otpRouter);

// initialise google Auth
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "http://localhost:3000/home",
        failureRedirect: "http://localhost:3000/login",
    })
);

app.get("/login/sucess",async(req,res)=>{
    console.log('requested User',req.user);
})

// server started at 3000
app.listen(PORT, () => {
    console.log(`server connected on port number:  ${PORT}`);
});
