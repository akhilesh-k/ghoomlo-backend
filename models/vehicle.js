// models/vehicle.js
const mongoose = require("mongoose");

// Define the schema for the Vehicle model
const vehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    default: [],
  },
  seatCount: {
    type: Number,
    required: true,
  },
  minKilometers: {
    type: Number,
    required: true,
  },
});

// Create the Vehicle model
const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
