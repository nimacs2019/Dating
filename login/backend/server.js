require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./route/auth");
const cookieSession = require("cookie-session");
require("./middleware/passport"); // Import Passport configurationconst authRoute = require("./route/auth");

const app = express();

app.use(
    cookieSession({
        name: "Session",
        keys: ["one-one-one-two"],
        maxAge: 24 * 60 * 60 * 100,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);
app.use("/auth", authRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server running on port number ${port}`);
});
