const BookingRequest = require("../models/booking-request");
const { getDatabase } = require("../database/db");

async function requestBooking(bookingData) {
  const db = getDatabase(); // Obtain the db object
  const newBooking = await db
    .collection("booking-request")
    .insertOne(bookingData);
  return newBooking;
}

// Service function to get all bookings
async function getAllBookings() {
  const bookingList = await BookingRequest.find();
  return bookingList;
}

module.exports = {
  requestBooking,
  getAllBookings,
};
