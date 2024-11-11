const express = require("express");
const driverService = require("../services/driver");

const router = express.Router();

// Create a Driver
router.post("/", async (req, res) => {
  try {
    const newDriver = await driverService.createDriver(
      req.body.user_id,
      req.body.vehicles,
    );
    res.status(201).json(newDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Driver by ID
router.get("/:driverId", async (req, res) => {
  try {
    const driver = await driverService.getDriverById(req.params.driverId);
    res.status(200).json(driver);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update a Driver
router.put("/:driverId", async (req, res) => {
  try {
    const updatedDriver = await driverService.updateDriver(
      req.params.driverId,
      req.body,
    );
    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Driver
router.delete("/:driverId", async (req, res) => {
  try {
    await driverService.deleteDriver(req.params.driverId);
    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get All Drivers
router.get("/", async (req, res) => {
  try {
    const drivers = await driverService.getAllDrivers();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Drivers by Vehicle ID
router.get("/by-vehicle/:vehicleId", async (req, res) => {
  try {
    const drivers = await driverService.getDriversByVehicleId(
      req.params.vehicleId,
    );
    res.status(200).json(drivers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
