const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    organization_id: {
      type: String,
      required: true
    },
    profile_pic: {
      type: String,
      default: ""
    },
    roles: {
      type: Array,
      default: []
    },
    uid: {
      type: String,
      required: true
    },
    created_by: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      default: ""
    },
    name: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
