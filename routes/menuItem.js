const express = require("express");
const router = express.Router();

// Require controller modules.
const menuItemController = require("../controllers/menuItems");

// GET restaurant home page.
router.get("/:restaurant_id", menuItemController.getMenuItems);

// POST request for creating Restaurant.
router.post("/create", menuItemController.createMenuItem);

// GET request for one Restaurant.
router.get("/:id", menuItemController.getMenuItemById);

// POST request to update Restaurant.
router.put("/:id", menuItemController.updateMenuItem);

// POST request to delete Restaurant.
router.delete("/:id", menuItemController.deleteMenuItem);

module.exports = router;
