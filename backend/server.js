const express = require("express");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("./database/dbConnection");

const otpRouter = require("./Middlewares/twilioOtp");
const userRouter = require("./Router/userRegister");
const googleAuth = require("./Router/googleAuth");
const employmentRouter = require('./Router/employementRouter')

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// enable connection with frontent data
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,PUT,POST,DELETE",
        credentials: true,
    })
);
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
// Use cookie-parser middleware
app.use(cookieParser());

// to parse the json data
app.use(express.json());


// Serve uploaded files
app.use('/uploads', express.static('uploads'));

app.use("/", otpRouter);
app.use("/", googleAuth);
app.use("/", userRouter);
app.use("/", employmentRouter);



// app.get("/login/success", authenticateToken,async (req, res) => {
//     console.log("requested User", req.user);

//     if (req.user) {
//         res.status(200).json({ message: "user login", user: req.user });
//     } else {
//         res.status(400).json({ message: "notAutherized" });
//     }
// });



// server started at 3000
app.listen(PORT, () => {
    console.log(`server connected on port number:  ${PORT}`);
});
