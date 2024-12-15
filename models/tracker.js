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
      required: true,
    },
    trackerLogs: [],
    started_from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Place",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Tracker = mongoose.model("Tracker", trackerSchema);

module.exports = Tracker;
