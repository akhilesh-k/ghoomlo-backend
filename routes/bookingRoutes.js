const express = require("express");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Endpoints for managing taxi bookings
 */

/**
 * @swagger
 * /bookings/request:
 *   post:
 *     summary: Create a new booking
 *     description: Create a new booking request.
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sourceName:
 *                 type: string
 *               destinationName:
 *                 type: string
 *               requestedTime:
 *                 type: string
 *               vehicleName:
 *                 type: string
 *             required:
 *               - sourceName
 *               - destinationName
 *               - requestedTime
 *               - vehicleName
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     bookingDetails:
 *                       $ref: '#/components/schemas/Booking'
 *                     followupMessage:
 *                       type: string
 *       500:
 *         description: Internal server error
 */
router.post("/request", bookingController.createBooking);

/**
 * @swagger
 * /bookings/list:
 *   get:
 *     summary: Get a list of all bookings
 *     description: Retrieve a list of all booking records.
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: A list of booking records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Internal server error
 */
router.get("/list", bookingController.getAllBookings);

/**
 * @swagger
 * /bookings/places:
 *   get:
 *     summary: Find places by search term and location
 *     description: Find places based on a search term and location.
 *     tags: [Bookings]
 *     operationId: findPlaces  // Custom operation ID
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         description: The term to search for places.
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: lat
 *         description: The latitude of the location (optional).
 *         schema:
 *           type: number
 *       - in: query
 *         name: long
 *         description: The longitude of the location (optional).
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: A list of places that match the search term and location
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Place'
 *       500:
 *         description: Internal server error
 */
router.get("/places", bookingController.findPlaces);

/**
 * @swagger
 * /bookings/cancel:
 *   delete:
 *     summary: Cancel a booking
 *     description: Cancel a booking by providing the booking ID.
 *     tags: [Bookings]
 *     parameters:
 *       - in: query
 *         name: bookingId
 *         description: The ID of the booking to cancel.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking canceled successfully
 *       500:
 *         description: Internal server error
 */
router.delete("/cancel", (req, res) =>
  bookingController.cancelBooking(req, res)
);

/**
 * @swagger
 * /bookings/details:
 *   get:
 *     summary: Get booking details
 *     description: Retrieve details of a specific booking by providing the booking ID.
 *     tags: [Bookings]
 *     parameters:
 *       - in: query
 *         name: bookingId
 *         description: The ID of the booking to retrieve details for.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Internal server error
 */
router.get("/details", (req, res) =>
  bookingController.getBookingDetails(req, res)
);

/**
 * @swagger
 * /bookings/history:
 *   get:
 *     summary: Get ride history
 *     description: Retrieve a history of previous rides, including details like date, time, source, destination, and fare.
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: Ride history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       500:
 *         description: Internal server error
 */
router.get("/history", (req, res) =>
  bookingController.getRideHistory(req, res)
);

/**
 * @swagger
 * /bookings/invoice:
 *   get:
 *     summary: Get invoice
 *     description: Generate and provide an invoice for completed rides by providing the booking ID.
 *     tags: [Bookings]
 *     parameters:
 *       - in: query
 *         name: bookingId
 *         description: The ID of the booking to generate an invoice for.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Invoice generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       500:
 *         description: Internal server error
 */
router.get("/invoice", (req, res) => bookingController.getInvoice(req, res));

module.exports = router;
