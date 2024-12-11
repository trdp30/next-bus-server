const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    organization_id: {
      type: String,
      required: false,
      default: "1",
    },
    profile_pic: {
      type: String,
      default: "",
    },
    roles: {
      type: Array,
      default: [],
      required: true,
    },
    uid: {
      type: String,
      required: true,
    },
    created_by: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    pan: {
      type: String,
      trim: true,
    },
    address_1: {
      type: String,
      trim: true,
    },
    address_2: {
      type: String,
      trim: true,
    },
    location: {
      type: Object,
    },
    driving_license: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
