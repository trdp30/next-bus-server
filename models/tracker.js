const mongoose = require("mongoose");

const trackerSchema = new mongoose.Schema(
  {
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    trackerLogs: [],
    started_from: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

const Tracker = mongoose.model("Tracker", trackerSchema);

module.exports = Tracker;
