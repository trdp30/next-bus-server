const express = require("express");
const router = express.Router();

// Require controller modules.
const restaurant_controller = require("../controllers/restaurant");
/// RESTAURANT ROUTES ///

// GET restaurant home page.
router.get("/", restaurant_controller.restaurant_list);

// GET request for creating a Restaurant. NOTE This must come before routes that display Restaurant (uses id).
router.get("/create", restaurant_controller.restaurant_create_get);

// POST request for creating Restaurant.
router.post("/create", restaurant_controller.restaurant_create_post);

// GET request to delete Restaurant.
router.get("/:id/delete", restaurant_controller.restaurant_delete_get);

// POST request to delete Restaurant.
router.post("/:id/delete", restaurant_controller.restaurant_delete_post);

// GET request to update Restaurant.
router.get("/:id/update", restaurant_controller.restaurant_update_get);

// POST request to update Restaurant.
router.post("/:id/update", restaurant_controller.restaurant_update_post);

// GET request for one Restaurant.
router.get("/:id", restaurant_controller.restaurant_detail);

// GET request for list of all Restaurant items.
router.get("/restaurants", restaurant_controller.restaurant_list);

module.exports = router;
