// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const RestaurantModelSchema = new Schema({
  name: String,
  email: String,
  address1: String,
  address2: String,
  state: String,
  district: String,
  city: String,
  pin_code: Number,
  location: Object,
  updated_at: { type: Date, default: Date.now() },
  created_at: { type: Date, default: Date.now() },
  created_by: { type: Number, default: 1 },
  updated_by: { type: Number, default: 1 }
});

module.exports = mongoose.model("restaurant", RestaurantModelSchema);
