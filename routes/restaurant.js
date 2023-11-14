const express = require("express");
const router = express.Router();

// Require controller modules.
const restaurant_controller = require("../controllers/restaurant");

// GET restaurant home page.
router.get("/", restaurant_controller.restaurant_list);

// POST request for creating Restaurant.
router.post("/create", restaurant_controller.restaurant_create_post);

// GET request for one Restaurant.
router.get("/:id", restaurant_controller.restaurant_detail);

// POST request to update Restaurant.
router.put("/:id", restaurant_controller.restaurant_update_put);

// POST request to delete Restaurant.
router.delete("/:id", restaurant_controller.restaurant_delete);

module.exports = router;
