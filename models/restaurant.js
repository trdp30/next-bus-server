// Require Mongoose
const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const RestaurantModelSchema = new Schema(
  {
    name: String,
    email: String,
    phone: Number,
    address1: String,
    address2: String,
    state: String,
    district: String,
    city: String,
    pin_code: Number,
    location: Object,
    created_by: { type: String, default: 1 },
    updated_by: { type: String, default: 1 },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("restaurant", RestaurantModelSchema);
