// bookingRoutes.js
const express = require("express");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

// Define the routes and associate them with the controller functions
router.post("/request", bookingController.createBooking);
router.get("/list", bookingController.getAllBookings);

module.exports = router;
