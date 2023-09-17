// feedbackService.js
const Review = require("../models/review"); // Assuming you have a Review model
const SupportRequest = require("../models/supportRequest"); // Assuming you have a SupportRequest model
const faqModel = require("../models/faq"); // Assuming you have a FAQ model

/**
 * Submit a review and rating for a completed ride.
 * @param {string} userId - User ID
 * @param {string} bookingId - Booking ID
 * @param {number} rating - User rating (1-5)
 * @param {string} reviewText - Optional review text
 * @returns {Promise<object>} - The submitted review and rating
 */
async function submitReview(userId, bookingId, rating, reviewText) {
  const review = new Review({
    userId,
    bookingId,
    rating,
    reviewText,
  });
  await review.save();
  return review;
}

/**
 * View driver ratings based on user feedback.
 * @param {string} driverId - Driver ID
 * @returns {Promise<number>} - The average driver rating
 */
async function viewDriverRatings(driverId) {
  const ratings = await Review.aggregate([
    {
      $match: { driverId },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  return ratings.length > 0 ? ratings[0].averageRating : 0;
}

/**
 * Submit a support request or report an issue.
 * @param {string} userId - User ID
 * @param {string} requestType - Type of support request (e.g., issue report, assistance request)
 * @param {string} description - Details and description of the support request
 * @returns {Promise<object>} - The submitted support request
 */
async function submitSupportRequest(userId, requestType, description) {
  const supportRequest = new SupportRequest({
    userId,
    requestType,
    description,
  });
  await supportRequest.save();
  return supportRequest;
}

/**
 * View frequently asked questions (FAQ).
 * @returns {Promise<Array>} - An array of FAQ items or an empty array if an exception occurs
 */
async function viewFaq() {
  try {
    const faq = await FAQ.find();
    return faq;
  } catch (error) {
    console.error("An error occurred while fetching FAQ:", error);
    return []; // Return an empty array in case of an exception
  }
}

/**
 * Add FAQs
 * @param {string} question - The question for the FAQ.
 * @param {string} answer - The answer to the FAQ question.
 * @returns {Promise<object>} - The newly added FAQ object.
 */
async function submitFaq(question, answer) {
  try {
    const faq = new faqModel({ question, answer });
    const savedFaq = await faq.save();
    return savedFaq;
  } catch (error) {
    throw error; // You can handle the error here or in the controller
  }
}

module.exports = {
  submitReview,
  viewDriverRatings,
  submitSupportRequest,
  viewFaq,
  submitFaq,
};
