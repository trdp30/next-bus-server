const mongoose = require("mongoose");

// Owner Schema
const ownerSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: [true, "User ID is required"],
      trim: true,
    },
    vehicles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
      },
    ],
    location: {
      type: String, // Consider using a more specific geolocation type (e.g., GeoJSON)
    },
  },
  {
    timestamps: true,
  },
);

// Validate the length of the user_id
ownerSchema.path("user_id").validate(function (value) {
  return value.length >= 3; // Example validation: user_id must be at least 3 characters long
}, "User ID must be at least 3 characters long.");

const Owner = mongoose.model("Owner", ownerSchema);

module.exports = Owner;
