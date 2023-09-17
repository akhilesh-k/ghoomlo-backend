// fleetService.js
const Vehicle = require("../models/vehicle"); // Import your vehicle model

/**
 * Service function to add a new vehicle to the fleet.
 * @param {Object} vehicleDetails - Vehicle details to be added.
 * @returns {Promise<Object>} - Resolves to the added vehicle.
 */
async function addVehicle(vehicleDetails) {
  // Implement logic to add a new vehicle to the fleet
  // Create a new instance of the Vehicle model and save it to your database
  const newVehicle = new Vehicle(vehicleDetails);
  await newVehicle.save();

  return newVehicle;
}

/**
 * Service function to update an existing vehicle in the fleet.
 * @param {string} vehicleId - ID of the vehicle to be updated.
 * @param {Object} updatedVehicleDetails - Updated vehicle details.
 * @returns {Promise<Object|null>} - Resolves to the updated vehicle or null if not found.
 */
async function updateVehicle(vehicleId, updatedVehicleDetails) {
  // Implement logic to update an existing vehicle in the fleet
  // Find the vehicle by ID and update its details in your database
  const updatedVehicle = await Vehicle.findByIdAndUpdate(
    vehicleId,
    updatedVehicleDetails,
    { new: true }
  );

  return updatedVehicle;
}

/**
 * Service function to remove a vehicle from the fleet.
 * @param {string} vehicleId - ID of the vehicle to be removed.
 * @returns {Promise<void>}
 */
async function removeVehicle(vehicleId) {
  // Implement logic to remove a vehicle from the fleet
  // Find the vehicle by ID and delete it from your database
  await Vehicle.findByIdAndDelete(vehicleId);
}

/**
 * Service function to update the prices of a vehicle in the fleet.
 * @param {string} vehicleId - ID of the vehicle to update prices for.
 * @param {number} rate - New rate for the vehicle.
 * @param {number} minKilometers - New minimum kilometers for the vehicle.
 * @returns {Promise<Object|null>} - Resolves to the updated vehicle or null if not found.
 */
async function updateVehiclePrices(vehicleId, rate, minKilometers) {
  // Implement logic to update the prices of a vehicle in the fleet
  // Find the vehicle by ID and update its rate and minKilometers in your database
  const updatedVehicle = await Vehicle.findByIdAndUpdate(
    vehicleId,
    { rate, minKilometers },
    { new: true }
  );

  return updatedVehicle;
}

module.exports = {
  addVehicle,
  updateVehicle,
  removeVehicle,
  updateVehiclePrices,
};
