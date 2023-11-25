const asyncHandler = require("express-async-handler");
const MenuItemModel = require("../models/menuItem");
const RestaurantModel = require("../models/restaurant");

const createMenuItem = asyncHandler(async (req, res) => {
  const payload = req.body;
  const session = req.decodedToken;

  if (!Object.keys(payload).length) {
    return res.status(400).json({ error: "Empty payload" });
  }

  const restaurantId = payload.restaurant_id;

  const restaurant = await RestaurantModel.findById(restaurantId);
  if (!restaurant && !restaurant?._id) {
    return res.status(400).json({ error: "Restaurant not found" });
  }

  const model = await MenuItemModel.createMenuItem({ payload, session });

  return res.status(201).json(model);
});

const getMenuItems = asyncHandler(async (req, res) => {
  const restaurantId = req.params.restaurant_id;
  if (!restaurantId) {
    return res.status(400).json({ error: "Missing restaurantId" });
  }
  const model = await MenuItemModel.getMenuItems({ restaurantId });
  return res.status(200).json(model);
});

const getMenuItemById = asyncHandler(async (req, res) => {
  const menuItemId = req.params.id;
  if (!menuItemId) {
    return res.status(400).json({ error: "Missing param: menuItemId" });
  }
  const model = await MenuItemModel.getMenuItemById({ menuItemId });
  return res.status(200).json(model);
});

const updateMenuItem = asyncHandler(async (req, res) => {
  const menuItemId = req.params.id;
  const payload = req.body;
  const session = req.decodedToken;

  if (!Object.keys(payload).length) {
    return res.status(400).json({ error: "Empty payload" });
  }

  const model = await MenuItemModel.updateMenuItem({ menuItemId, payload, session });

  return res.status(201).json(model);
});

const deleteMenuItem = asyncHandler(async (req, res) => {
  const menuItemId = req.params.id;
  if (!menuItemId) {
    return res.status(400).json({ error: "Missing param: menuItemId" });
  }
  await MenuItemModel.deleteMenuItem({ menuItemId });
  res.sendStatus(204);
});

const deleteAllMenuItemByResId = asyncHandler(async (req, res) => {
  const restaurantId = req.params.restaurant_id;
  if (!restaurantId) {
    return res.status(400).json({ error: "Missing param: restaurantId" });
  }
  await MenuItemModel.deleteAllMenuItemByResId({ restaurantId });
  res.sendStatus(204);
});

module.exports = {
  createMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
  deleteAllMenuItemByResId,
};
