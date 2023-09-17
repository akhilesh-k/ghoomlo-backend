const express = require("express");
const fleetController = require("../controllers/fleetController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Fleet Management
 *   description: Endpoints for managing the fleet of vehicles
 */

/**
 * @swagger
 * /fleet/add-vehicle:
 *   post:
 *     summary: Add a new vehicle to the fleet
 *     description: Add a new vehicle with the specified details to the fleet.
 *     tags: [Fleet Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               registrationNumber:
 *                 type: string
 *               rate:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               seatCount:
 *                 type: number
 *               minKilometers:
 *                 type: number
 *             required:
 *               - name
 *               - type
 *               - registrationNumber
 *               - rate
 *               - seatCount
 *               - minKilometers
 *     responses:
 *       201:
 *         description: Vehicle added successfully
 *       500:
 *         description: Internal server error
 */
router.post("/add-vehicle", fleetController.addVehicle);

/**
 * @swagger
 * /fleet/update-vehicle/{vehicleId}:
 *   put:
 *     summary: Update an existing vehicle in the fleet
 *     description: Update the details of an existing vehicle in the fleet.
 *     tags: [Fleet Management]
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         description: ID of the vehicle to be updated
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *               registrationNumber:
 *                 type: string
 *               rate:
 *                 type: number
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               seatCount:
 *                 type: number
 *               minKilometers:
 *                 type: number
 *             required:
 *               - name
 *               - type
 *               - registrationNumber
 *               - rate
 *               - seatCount
 *               - minKilometers
 *     responses:
 *       200:
 *         description: Vehicle updated successfully
 *       500:
 *         description: Internal server error
 */
router.put("/update-vehicle/:vehicleId", fleetController.updateVehicle);

/**
 * @swagger
 * /fleet/remove-vehicle/{vehicleId}:
 *   delete:
 *     summary: Remove a vehicle from the fleet
 *     description: Remove a vehicle from the fleet by its ID.
 *     tags: [Fleet Management]
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         description: ID of the vehicle to be removed
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vehicle removed successfully
 *       500:
 *         description: Internal server error
 */
router.delete("/remove-vehicle/:vehicleId", fleetController.removeVehicle);

/**
 * @swagger
 * /fleet/update-vehicle-prices/{vehicleId}:
 *   put:
 *     summary: Update the prices of a vehicle
 *     description: Update the pricing details of a specific vehicle in the fleet.
 *     tags: [Fleet Management]
 *     parameters:
 *       - in: path
 *         name: vehicleId
 *         description: ID of the vehicle to update prices for
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rate:
 *                 type: number
 *               minKilometers:
 *                 type: number
 *             required:
 *               - rate
 *               - minKilometers
 *     responses:
 *       200:
 *         description: Vehicle prices updated successfully
 *       500:
 *         description: Internal server error
 */
router.put(
  "/update-vehicle-prices/:vehicleId",
  fleetController.updateVehiclePrices
);

module.exports = router;
