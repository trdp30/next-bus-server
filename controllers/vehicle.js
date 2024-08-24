const express = require("express");
const vehicleService = require("../services/vehicle");

const router = express.Router();

// Create a Vehicle
router.post("/", async (req, res) => {
  try {
    const newVehicle = await vehicleService.createVehicle(
      req.body.name,
      req.body.registration_number,
      req.body.chassis_number,
      req.body.engine_number,
      req.body.created_by,
      req.body.owner,
    );
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Vehicle by ID
router.get("/:vehicleId", async (req, res) => {
  try {
    const vehicle = await vehicleService.getVehicleById(req.params.vehicleId);
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update a Vehicle
router.put("/:vehicleId", async (req, res) => {
  try {
    const updatedVehicle = await vehicleService.updateVehicle(req.params.vehicleId, req.body);
    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Vehicle
router.delete("/:vehicleId", async (req, res) => {
  try {
    await vehicleService.deleteVehicle(req.params.vehicleId);
    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get All Vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Vehicles by Owner ID
router.get("/by-owner/:ownerId", async (req, res) => {
  try {
    const vehicles = await vehicleService.getVehiclesByOwnerId(req.params.ownerId);
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
