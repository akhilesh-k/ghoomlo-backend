// fleetController.js
const fleetService = require("../services/fleetService");

/**
 * Controller function to add a new vehicle to the fleet.
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 */
async function addVehicle(req, res) {
  try {
    const {
      name,
      type,
      registrationNumber,
      rate,
      images,
      seatCount,
      minKilometers,
    } = req.body;

    // Implement logic to validate and add the new vehicle to the fleet
    const vehicle = await fleetService.addVehicle({
      name,
      type,
      registrationNumber,
      rate,
      images,
      seatCount,
      minKilometers,
    });

    res.status(201).json({
      success: true,
      data: {
        vehicleDetails: vehicle,
        followupMessage: "Vehicle added successfully",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Controller function to update an existing vehicle in the fleet.
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 */
async function updateVehicle(req, res) {
  try {
    const vehicleId = req.params.vehicleId;
    const {
      name,
      type,
      registrationNumber,
      rate,
      images,
      seatCount,
      minKilometers,
    } = req.body;

    // Implement logic to validate and update the existing vehicle in the fleet
    const updatedVehicle = await fleetService.updateVehicle(vehicleId, {
      name,
      type,
      registrationNumber,
      rate,
      images,
      seatCount,
      minKilometers,
    });

    res.status(200).json({
      success: true,
      data: {
        updatedVehicleDetails: updatedVehicle,
        followupMessage: "Vehicle updated successfully",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Controller function to remove a vehicle from the fleet.
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 */
async function removeVehicle(req, res) {
  try {
    const vehicleId = req.params.vehicleId;

    // Implement logic to remove the vehicle from the fleet
    await fleetService.removeVehicle(vehicleId);

    res.status(200).json({
      success: true,
      followupMessage: "Vehicle removed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

/**
 * Controller function to update the prices of a vehicle in the fleet.
 * @param {Request} req - Express Request object
 * @param {Response} res - Express Response object
 */
async function updateVehiclePrices(req, res) {
  try {
    const vehicleId = req.params.vehicleId;
    const { rate, minKilometers } = req.body;

    // Implement logic to update the prices of the specified vehicle
    const updatedVehicle = await fleetService.updateVehiclePrices(
      vehicleId,
      rate,
      minKilometers
    );

    res.status(200).json({
      success: true,
      data: {
        updatedVehicleDetails: updatedVehicle,
        followupMessage: "Vehicle prices updated successfully",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  addVehicle,
  updateVehicle,
  removeVehicle,
  updateVehiclePrices,
};
