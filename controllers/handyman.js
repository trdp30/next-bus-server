const express = require("express");
const handymanService = require("../services/handyman");

const router = express.Router();

// Create a Handyman
router.post("/", async (req, res) => {
  try {
    const newHandyman = await handymanService.createHandyman(
      req.body.user_id,
      req.body.vehicles,
    );
    res.status(201).json(newHandyman);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Handyman by ID
router.get("/:handymanId", async (req, res) => {
  try {
    const handyman = await handymanService.getHandymanById(
      req.params.handymanId,
    );
    res.status(200).json(handyman);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update a Handyman
router.put("/:handymanId", async (req, res) => {
  try {
    const updatedHandyman = await handymanService.updateHandyman(
      req.params.handymanId,
      req.body,
    );
    res.status(200).json(updatedHandyman);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Handyman
router.delete("/:handymanId", async (req, res) => {
  try {
    await handymanService.deleteHandyman(req.params.handymanId);
    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get All Handymen
router.get("/", async (req, res) => {
  try {
    const handymen = await handymanService.getAllHandymen();
    res.status(200).json(handymen);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Handymen by Vehicle ID
router.get("/by-vehicle/:vehicleId", async (req, res) => {
  try {
    const handymen = await handymanService.getHandymenByVehicleId(
      req.params.vehicleId,
    );
    res.status(200).json(handymen);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
