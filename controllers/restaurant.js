const Restaurant = require("../models/restaurant");
const asyncHandler = require("express-async-handler");

// Display list of all Restaurants.

exports.restaurant_list = asyncHandler(async (req, res, next) => {
  const model = await Restaurant.find().exec();
  res.status(200).json(model);
});

// Display detail page for a specific Restaurant.
exports.restaurant_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Restaurant detail: ${req.params.id}`);
});

// Display Restaurant create form on GET.
exports.restaurant_create_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Restaurant create GET");
});

// Handle Restaurant create on POST.
exports.restaurant_create_post = asyncHandler(async (req, res, next) => {
  const model = new Restaurant(req.body);
  const response = await model.save();
  await model.save();
  res.status(201).json(response);
});

// Display Restaurant delete form on GET.
exports.restaurant_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Restaurant delete GET");
});

// Handle Restaurant delete on POST.
exports.restaurant_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Restaurant delete POST");
});

// Display Restaurant update form on GET.
exports.restaurant_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Restaurant update GET");
});

// Handle Restaurant update on POST.
exports.restaurant_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Restaurant update POST");
});
