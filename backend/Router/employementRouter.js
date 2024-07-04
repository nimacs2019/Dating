const express = require("express");
const router = express.Router();
const User = require("../database/model/userSchema");
const authenticateToken = require("../Middlewares/jwt");

// Import other necessary modules

// Route for handling employment data submission
router.post("/api/employment", authenticateToken, async (req, res) => {
    const { employmentType, companyName, designation, location, expertiseLevel } = req.body;
    const { _id } = req.user;
    const userId = req.user._id;
    console.log('user id ',userId);

    const employeeDetails =
        employmentType === "Jobseeker"
            ? { employmentType, expertiseLevel }
            : { employmentType, companyName, designation, location };

    console.log("Received employment details:", employeeDetails);

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Update user details based on employment type
        user.userType = employmentType;
        user.companyName = companyName || "";
        user.designation = designation || "";
        user.location = location || "";
        user.expertiseLevel = expertiseLevel || "";

        await user.save();
        return res.status(200).json({ success: true, message: "Employment details updated successfully" });
    } catch (error) {
        console.error("Error in updating employment details:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

module.exports = router;
