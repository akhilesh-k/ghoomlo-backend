// authController.js
const userService = require("../services/userService");
const authService = require("../services/authService");

/**
 * Register a new user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function registerUser(req, res) {
  try {
    const { username, password, email, phoneNumber } = req.body;
    const newUser = await userService.registerUser({
      username,
      password,
      email,
      phoneNumber,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ message: "Failed to register user", error: error.message });
  }
}

/**
 * Onboard a user with additional details.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function onboardUser(req, res) {
  try {
    const { userId, fullName, address, profileImage, otherDetails } = req.body;
    const updatedUser = await userService.onboardUser({
      userId,
      fullName,
      address,
      profileImage,
      otherDetails,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error onboarding user:", error);
    res
      .status(500)
      .json({ message: "Failed to onboard user", error: error.message });
  }
}

/**
 * Remove a user's account and data.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function removeUser(req, res) {
  try {
    const { userId } = req.body;
    await userService.removeUser(userId);
    res.status(200).json({ message: "User removed successfully" });
  } catch (error) {
    console.error("Error removing user:", error);
    res
      .status(500)
      .json({ message: "Failed to remove user", error: error.message });
  }
}

/**
 * Send OTP to user's registered phone number or email for verification.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function sendOTP(req, res) {
  try {
    const { userId, contactType } = req.body;
    await authService.sendOTP(userId, contactType);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res
      .status(500)
      .json({ message: "Failed to send OTP", error: error.message });
  }
}

/**
 * Verify the one-time password (OTP) entered by the user for authentication.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function verifyOTP(req, res) {
  try {
    const { userId, otp } = req.body;
    const isOTPValid = await authService.verifyOTP(userId, otp);
    if (isOTPValid) {
      const token = authService.generateAuthToken(userId);
      res.status(200).json({ message: "OTP verified successfully", token });
    } else {
      res.status(401).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res
      .status(500)
      .json({ message: "Failed to verify OTP", error: error.message });
  }
}

/**
 * Reset the user's password using a password reset token.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function resetPassword(req, res) {
  try {
    const { email, resetToken, newPassword } = req.body;
    await authService.resetPassword(email, resetToken, newPassword);
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ message: "Failed to reset password", error: error.message });
  }
}

/**
 * Get the profile of the currently logged-in user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
async function getUserProfile(req, res) {
  try {
    const user = await userService.getUserById(req.userId); // Assumes userId is set in JWT middleware
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch user profile", error: error.message });
  }
}

module.exports = {
  registerUser,
  onboardUser,
  removeUser,
  sendOTP,
  verifyOTP,
  resetPassword,
  getUserProfile,
};
