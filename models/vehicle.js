const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    registration_number: {
      type: String,
      required: false,
      trim: true,
    },
    chassis_number: {
      type: String,
      required: true,
      trim: true,
    },
    engine_number: {
      type: Number,
      required: true,
      trim: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // This references the 'Owner' model
      required: true, // You can choose to make this required or not based on your needs
    },
  },
  {
    timestamps: true,
  },
);

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
