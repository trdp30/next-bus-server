const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      trim: true,
    },
    vehicles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle", // This references the 'Vehicle' model
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
