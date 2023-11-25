const express = require("express");
const router = express.Router();

// Require controller modules.
const menuItemController = require("../controllers/menuItems");

// GET restaurant home page.
router.get("/:restaurant_id", menuItemController.getMenuItems);

// POST request for creating Menu item.
router.post("/create", menuItemController.createMenuItem);

// GET request for one Menu item.
router.get("/:id", menuItemController.getMenuItemById);

// POST request to update Menu item.
router.put("/:id", menuItemController.updateMenuItem);

// POST request to delete Menu item.
router.delete("/:id", menuItemController.deleteMenuItem);

// POST request to delete Menu item for a restaurant.
router.delete("/:restaurant_id", menuItemController.deleteAllMenuItemByResId);

module.exports = router;
