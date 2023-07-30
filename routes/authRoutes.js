const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// API endpoint to send OTP to a phone number
router.post("/send-otp", (req, res) => {
  authController.sendOTP(req, res);
});

// API endpoint to verify OTP for a phone number
router.post("/verify-otp", authController.verifyOTP);

module.exports = router;
