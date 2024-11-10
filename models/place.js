const mongoose = require("mongoose");

const place = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: Object,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Place = mongoose.model("Place", place);

module.exports = Place;
