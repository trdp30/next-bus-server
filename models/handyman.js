const mongoose = require("mongoose");

const handymanSchema = new mongoose.Schema(
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

const Handyman = mongoose.model("Handyman", handymanSchema);

module.exports = Handyman;
