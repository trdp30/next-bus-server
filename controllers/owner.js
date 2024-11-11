const express = require("express");
const ownerService = require("../services/owner");

const router = express.Router();

// Create an Owner
router.post("/", async (req, res) => {
  try {
    const newOwner = await ownerService.createOwner(
      req.body.user_id,
      req.body.vehicles,
      req.body.location,
    );
    res.status(201).json(newOwner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Owner by ID
router.get("/:ownerId", async (req, res) => {
  try {
    const owner = await ownerService.getOwnerById(req.params.ownerId);
    res.status(200).json(owner);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update an Owner
router.put("/:ownerId", async (req, res) => {
  try {
    const updatedOwner = await ownerService.updateOwner(
      req.params.ownerId,
      req.body,
    );
    res.status(200).json(updatedOwner);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an Owner
router.delete("/:ownerId", async (req, res) => {
  try {
    await ownerService.deleteOwner(req.params.ownerId);
    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get All Owners
router.get("/", async (req, res) => {
  try {
    const owners = await ownerService.getAllOwners();
    res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Owners by Location
router.get("/by-location/:location", async (req, res) => {
  try {
    const owners = await ownerService.getOwnersByLocation(req.params.location);
    res.status(200).json(owners);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
