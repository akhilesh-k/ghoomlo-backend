// feedbackRoutes.js
const express = require("express");
const feedbackController = require("../controllers/feedbackController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Feedback
 *   description: Endpoints for user feedback and support
 */

/**
 * @swagger
 * /feedback/submit-review:
 *   post:
 *     summary: Submit a review and rating
 *     description: Allow users to submit reviews and ratings for completed rides.
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookingId:
 *                 type: string
 *                 description: The ID of the completed ride.
 *               rating:
 *                 type: number
 *                 description: The user's rating for the ride (1-5).
 *               reviewText:
 *                 type: string
 *                 description: Optional text review for the ride.
 *             required:
 *               - bookingId
 *               - rating
 *     responses:
 *       201:
 *         description: Review submitted successfully
 *       500:
 *         description: Internal server error
 */
router.post("/submit-review", (req, res) =>
  feedbackController.submitReview(req, res)
);

/**
 * @swagger
 * /feedback/driver-ratings:
 *   get:
 *     summary: View driver ratings
 *     description: Show the driver's average rating based on user feedback.
 *     tags: [Feedback]
 *     parameters:
 *       - in: query
 *         name: driverId
 *         description: The ID of the driver to view ratings for.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Driver ratings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 driverId:
 *                   type: string
 *                   description: The ID of the driver.
 *                 averageRating:
 *                   type: number
 *                   description: The average rating of the driver based on user feedback.
 *       500:
 *         description: Internal server error
 */
router.get("/driver-ratings", (req, res) =>
  feedbackController.viewDriverRatings(req, res)
);

/**
 * @swagger
 * /feedback/submit-support-request:
 *   post:
 *     summary: Submit a support request
 *     description: Allow users to submit support requests or report issues.
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user submitting the support request.
 *               requestType:
 *                 type: string
 *                 description: The type of support request (e.g., issue report, assistance request).
 *               description:
 *                 type: string
 *                 description: Details and description of the support request.
 *             required:
 *               - userId
 *               - requestType
 *               - description
 *     responses:
 *       201:
 *         description: Support request submitted successfully
 *       500:
 *         description: Internal server error
 */
router.post("/submit-support-request", (req, res) =>
  feedbackController.submitSupportRequest(req, res)
);

/**
 * @swagger
 * /feedback/view-faq:
 *   get:
 *     summary: View FAQ
 *     description: Provide access to frequently asked questions and help articles.
 *     tags: [Feedback]
 *     responses:
 *       200:
 *         description: FAQ retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FAQ'
 *       500:
 *         description: Internal server error
 */
router.get("/view-faq", (req, res) => feedbackController.viewFaq(req, res));

/**
 * @swagger
 * /feedback/submit-faq:
 *   post:
 *     summary: Submit a new FAQ
 *     description: Allow users to submit new frequently asked questions (FAQ).
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 description: The question for the FAQ.
 *               answer:
 *                 type: string
 *                 description: The answer to the FAQ question.
 *             required:
 *               - question
 *               - answer
 *     responses:
 *       201:
 *         description: FAQ submitted successfully
 *       500:
 *         description: Internal server error
 */
router.post("/submit-faq", (req, res) =>
  feedbackController.submitFaq(req, res)
);

module.exports = router;
