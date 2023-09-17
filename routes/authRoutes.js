const express = require("express");
const authController = require("../controllers/authController");
const jwtMiddleware = require("../middleware/jwtMiddleware"); // Middleware for JWT authentication
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Endpoints for user authentication and registration
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with the specified details.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *             required:
 *               - username
 *               - password
 *               - email
 *               - phoneNumber
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Internal server error
 */
router.post("/register", (req, res) => authController.registerUser(req, res));

/**
 * @swagger
 * /auth/onboard:
 *   put:
 *     summary: Onboard a user
 *     description: Update and onboard a user with additional details.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               fullName:
 *                 type: string
 *               address:
 *                 type: string
 *               profileImage:
 *                 type: string
 *               otherDetails:
 *                 type: object
 *             required:
 *               - userId
 *     responses:
 *       200:
 *         description: User onboarded successfully
 *       500:
 *         description: Internal server error
 */
router.put("/onboard", (req, res) => authController.onboardUser(req, res));

/**
 * @swagger
 * /auth/remove-user:
 *   delete:
 *     summary: Remove a user
 *     description: Remove a user's account and data.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *             required:
 *               - userId
 *     responses:
 *       200:
 *         description: User removed successfully
 *       500:
 *         description: Internal server error
 */
router.delete("/remove-user", (req, res) =>
  authController.removeUser(req, res)
);

/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     summary: Send OTP to user
 *     description: Send a one-time password (OTP) to a user's registered phone number or email for verification.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               contactType:
 *                 type: string
 *             required:
 *               - userId
 *               - contactType
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       500:
 *         description: Internal server error
 */
router.post("/send-otp", (req, res) => authController.sendOTP(req, res));

/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Verify OTP
 *     description: Verify the one-time password (OTP) entered by the user for authentication.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               otp:
 *                 type: string
 *             required:
 *               - userId
 *               - otp
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       401:
 *         description: Invalid OTP
 *       500:
 *         description: Internal server error
 */
router.post("/verify-otp", (req, res) => authController.verifyOTP(req, res));

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset Password
 *     description: Reset the user's password using a password reset token.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               resetToken:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - email
 *               - resetToken
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password reset successful
 *       401:
 *         description: Invalid token
 *       500:
 *         description: Internal server error
 */
router.post("/reset-password", (req, res) =>
  authController.resetPassword(req, res)
);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get User Profile
 *     description: Get the profile of the currently logged-in user.
 *     tags: [Authentication]
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/me", jwtMiddleware, (req, res) =>
  authController.getUserProfile(req, res)
);

module.exports = router;
