// feedbackController.js
const feedbackService = require("../services/feedbackService");

/**
 * Submit a review and rating for a completed ride.
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
async function submitReview(req, res) {
  try {
    const { bookingId, rating, reviewText } = req.body;
    const userId = req.user.id; // Assuming you have user authentication middleware

    const result = await feedbackService.submitReview(
      userId,
      bookingId,
      rating,
      reviewText
    );

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

/**
 * View driver ratings based on user feedback.
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
async function viewDriverRatings(req, res) {
  try {
    const { driverId } = req.query;

    const ratings = await feedbackService.viewDriverRatings(driverId);

    res.status(200).json({ driverId, averageRating: ratings });
  } catch (error) {
    console.error("Error viewing driver ratings:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

/**
 * Submit a support request or report an issue.
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
async function submitSupportRequest(req, res) {
  try {
    const { userId, requestType, description } = req.body;

    const result = await feedbackService.submitSupportRequest(
      userId,
      requestType,
      description
    );

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    console.error("Error submitting support request:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

/**
 * View frequently asked questions (FAQ).
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
async function viewFaq(req, res) {
  try {
    const faq = await feedbackService.viewFaq();
    if (faq.length) {
      res.status(200).json(faq);
    } else {
      res.status(422).json(faq);
    }
  } catch (error) {
    console.error("Error viewing FAQ:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

/**
 * Add FAQs
 * @param {express.Request} req - Express request object
 * @param {express.Response} res - Express response object
 */
async function submitFaq(req, res) {
  try {
    const { question, answer } = req.body;
    const result = await feedbackService.submitFaq(question, answer);

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    console.error("Error submitting FAQ:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
}

module.exports = {
  submitReview,
  viewDriverRatings,
  submitSupportRequest,
  viewFaq,
  submitFaq,
};
