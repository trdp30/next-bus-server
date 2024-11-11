const mongoose = require("mongoose");

const assistantDriverSchema = new mongoose.Schema(
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

const AssistantDriver = mongoose.model(
  "AssistantDriver",
  assistantDriverSchema,
);

module.exports = AssistantDriver;
