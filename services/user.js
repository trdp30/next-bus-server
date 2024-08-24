const User = require("../models/user");

// Create a User
const createUser = async (email, organizationId, profilePic, roles, uid, createdBy, phone, name) => {
  try {
    const user = new User({
      email,
      organization_id: organizationId,
      profile_pic: profilePic,
      roles,
      uid,
      created_by: createdBy,
      phone,
      name,
    });
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

// Get User by ID
const getUserById = async userId => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(`Error retrieving user: ${error.message}`);
  }
};

// Update a User
const updateUser = async (userId, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

// Delete a User
const deleteUser = async userId => {
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

// Get All Users
const getAllUsers = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error(`Error retrieving users: ${error.message}`);
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
};
