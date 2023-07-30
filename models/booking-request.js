const mongoose = require("mongoose");

const bookingRequestSchema = new mongoose.Schema({
  sourceName: {
    type: String,
    required: true,
  },
  sourceLatLong: {
    type: String,
    required: true,
  },
  destinationName: {
    type: String,
    required: true,
  },
  destinationLatLong: {
    type: String,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  visitorId: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  requestedTime: {
    type: Date,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  visitTime: {
    type: Date,
    required: true,
  },
  vehicleName: {
    type: String,
    required: true,
  },
});

const BookingRequest = mongoose.model("booking-request", bookingRequestSchema);
module.exports = BookingRequest;
