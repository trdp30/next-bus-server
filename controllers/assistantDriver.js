const express = require("express");
const assistantDriverService = require("../services/assistantDriver");

const router = express.Router();

// Create an Assistant Driver
router.post("/", async (req, res) => {
  try {
    const newAssistantDriver = await assistantDriverService.createAssistantDriver(req.body.user_id, req.body.vehicles);
    res.status(201).json(newAssistantDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Assistant Driver by ID
router.get("/:assistantDriverId", async (req, res) => {
  try {
    const assistantDriver = await assistantDriverService.getAssistantDriverById(req.params.assistantDriverId);
    res.status(200).json(assistantDriver);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update an Assistant Driver
router.put("/:assistantDriverId", async (req, res) => {
  try {
    const updatedAssistantDriver = await assistantDriverService.updateAssistantDriver(
      req.params.assistantDriverId,
      req.body,
    );
    res.status(200).json(updatedAssistantDriver);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an Assistant Driver
router.delete("/:assistantDriverId", async (req, res) => {
  try {
    await assistantDriverService.deleteAssistantDriver(req.params.assistantDriverId);
    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get All Assistant Drivers
router.get("/", async (req, res) => {
  try {
    const assistantDrivers = await assistantDriverService.getAllAssistantDrivers();
    res.status(200).json(assistantDrivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Assistant Drivers by Vehicle ID
router.get("/by-vehicle/:vehicleId", async (req, res) => {
  try {
    const assistantDrivers = await assistantDriverService.getAssistantDriversByVehicleId(req.params.vehicleId);
    res.status(200).json(assistantDrivers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
