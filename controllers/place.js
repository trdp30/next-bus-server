const express = require("express");
const placeService = require("../services/place");

const router = express.Router();

// Create a Place
router.post("/", async (req, res) => {
  try {
    const payload = {
      name: req.body.name,
      created_by: req?.decodedToken?.user_id,
      location: req.body.location,
    };
    const newPlace = await placeService.createPlace(payload);
    res.status(201).json(newPlace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Place by ID
router.get("/:placeId", async (req, res) => {
  try {
    const place = await placeService.getPlaceById(req.params.placeId);
    res.status(200).json(place);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update a Place
router.put("/:placeId", async (req, res) => {
  try {
    const updatedPlace = await placeService.updatePlace(req.params.placeId, req.body);
    res.status(200).json(updatedPlace);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Place
router.delete("/:placeId", async (req, res) => {
  try {
    await placeService.deletePlace(req.params.placeId);
    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get All Places
router.get("/", async (req, res) => {
  try {
    const places = await placeService.getAllPlaces();
    res.status(200).json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Places by Location
router.get("/by-location", async (req, res) => {
  try {
    const location = {
      type: "Point",
      coordinates: [req.query.longitude, req.query.latitude],
    };
    const places = await placeService.getPlacesByLocation(location);
    res.status(200).json(places);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
