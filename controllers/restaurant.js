const Restaurant = require("../models/restaurant");
const asyncHandler = require("express-async-handler");

// Display list of all Restaurants on GET.
exports.restaurant_list = asyncHandler(async (req, res) => {
  const model = await Restaurant.find().exec();
  res.status(200).json(model);
});

// Handle Restaurant create on POST.
exports.restaurant_create_post = asyncHandler(async (req, res) => {
  const model = new Restaurant(req.body);
  model.set("created_by", req.decodedToken.user_id);
  const response = await model.save();
  await model.save();
  res.status(201).json(response);
});

// Display detail page for a specific Restaurant on GET.
exports.restaurant_detail = asyncHandler(async (req, res) => {
  const model = await Restaurant.findById(req.params.id).exec();
  if (model) {
    res.status(200).send(model);
  } else {
    res.sendStatus(404);
  }
});

// Handle Restaurant update on PUT.
exports.restaurant_update_put = asyncHandler(async (req, res) => {
  await Restaurant.findByIdAndUpdate(req.params.id, {
    ...req.body,
    updated_by: req?.decodedToken?.user_id
  }).exec();
  const model = await Restaurant.findById(req.params.id).exec();
  res.status(200).send(model);
});

// Handle Restaurant delete on DELETE.
exports.restaurant_delete = asyncHandler(async (req, res) => {
  await Restaurant.findByIdAndDelete(req.params.id).exec();
  res.sendStatus(204);
});
