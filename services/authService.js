const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();
const userService = require("./userService");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_EXPIRY_TIME = process.env.JWT_EXPIRY_TIME;

/**
 * Generate a JSON Web Token (JWT) for a user.
 * @param {string} userId - User ID to include in the token.
 * @returns {string} JWT token.
 */
function generateAuthToken(userId) {
  const payload = { userId };
  return jwt.sign(payload, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRY_TIME,
  });
}

/**
 * Send a one-time password (OTP) to a user's registered phone number or email for verification.
 * @param {string} userId - User ID.
 * @param {string} contactType - Contact type (e.g., "phone" or "email").
 */
async function sendOTP(userId, contactType) {
  // Generate a random OTP (e.g., 6 digits)
  const otp = generateOTP(6);

  // Store the OTP in a secure way (e.g., in a database)
  await userService.storeOTP(userId, otp);

  // Send the OTP to the user via the specified contact method (e.g., SMS or email)
  if (contactType === "phone") {
    // Implement logic to send OTP to the user's phone number
  } else if (contactType === "email") {
    // Implement logic to send OTP to the user's email address
  }
}

/**
 * Verify the one-time password (OTP) entered by the user for authentication.
 * @param {string} userId - User ID.
 * @param {string} otp - One-time password entered by the user.
 * @returns {boolean} True if OTP is valid, false otherwise.
 */
async function verifyOTP(userId, otp) {
  // Retrieve the stored OTP for the user
  const storedOTP = await userService.getStoredOTP(userId);

  // Compare the entered OTP with the stored OTP
  return otp === storedOTP;
}

/**
 * Reset the user's password using a password reset token.
 * @param {string} email - User's email address.
 * @param {string} resetToken - Password reset token.
 * @param {string} newPassword - New password.
 */
async function resetPassword(email, resetToken, newPassword) {
  // Verify the reset token (e.g., by checking against a stored token)
  const isValidToken = await userService.verifyResetToken(email, resetToken);

  if (isValidToken) {
    // Generate a salt and hash the new password
    const salt = crypto.randomBytes(16).toString("hex");
    const hashedPassword = hashPassword(newPassword, salt);

    // Update the user's password with the new hashed password
    await userService.updatePassword(email, hashedPassword, salt);

    // Invalidate the used reset token (e.g., mark it as used)
    await userService.invalidateResetToken(email, resetToken);
  } else {
    throw new Error("Invalid password reset token");
  }
}

/**
 * Generate a random one-time password (OTP) of the specified length.
 * @param {number} length - Length of the OTP.
 * @returns {string} Generated OTP.
 */
function generateOTP(length) {
  return Math.floor(100000 + Math.random() * 900000)
    .toString()
    .substr(0, length);
}

/**
 * Hash a password using a salt.
 * @param {string} password - Password to hash.
 * @param {string} salt - Salt for hashing.
 * @returns {string} Hashed password.
 */
function hashPassword(password, salt) {
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hash;
}

module.exports = {
  generateAuthToken,
  sendOTP,
  verifyOTP,
  resetPassword,
};
