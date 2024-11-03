const express = require("express");
const trackerService = require("../services/tracker");
const { authDriverAccess, authOwnerAccess } = require("../middlewares/authorization");

const router = express.Router();

// Create a Tracker
router.post("/", authDriverAccess, async (req, res) => {
  try {
    const newTracker = await trackerService.createTracker({
      payload: {
        vehicle: req?.body?.vehicle,
        date: req?.body?.date,
        driver: req?.body?.driver,
        trackerLogs: req?.body?.trackerLogs,
        started_from: req?.body?.started_from,
        created_by: req?.decodedToken?.user_id,
      },
    });
    res.status(201).json(newTracker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Tracker by ID
router.get("/:trackerId", async (req, res) => {
  try {
    const tracker = await trackerService.getTrackerById(req.params.trackerId);
    res.status(200).json(tracker);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Update a Tracker
// router.put("/:trackerId", authDriverAccess, async (req, res) => {
//   try {
//     const updatedTracker = await trackerService.updateTracker(req.params.trackerId, req.body);
//     res.status(200).json(updatedTracker);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// Delete a Tracker
router.delete("/:trackerId", authOwnerAccess, async (req, res) => {
  try {
    await trackerService.deleteTracker(req?.params?.trackerId);
    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get All Trackers
router.get("/", async (req, res) => {
  try {
    const query = req?.query?.q;
    const parsedQuery = query && JSON.parse(query);
    const trackers = await trackerService.getAllTrackers(parsedQuery);
    res.status(200).json(trackers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a Tracker Log
router.put("/log/:trackerId", async (req, res) => {
  try {
    const tracker = await trackerService.addTrackerLog(req?.params?.trackerId, req?.body);
    res.status(200).json(tracker);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
