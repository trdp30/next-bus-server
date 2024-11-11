const Owner = require("../models/owner");

// Create an Owner
const createOwner = async (userId, vehicles = [], location) => {
  try {
    const owner = new Owner({ user_id: userId, vehicles, location });
    await owner.save();
    return owner;
  } catch (error) {
    throw new Error(`Error creating owner: ${error.message}`);
  }
};

// Get Owner by ID
const getOwnerById = async (ownerId) => {
  try {
    const owner = await Owner.findById(ownerId).populate("vehicles");
    if (!owner) {
      throw new Error("Owner not found");
    }
    return owner;
  } catch (error) {
    throw new Error(`Error retrieving owner: ${error.message}`);
  }
};

// Update an Owner
const updateOwner = async (ownerId, updateData) => {
  try {
    const owner = await Owner.findByIdAndUpdate(ownerId, updateData, {
      new: true,
      runValidators: true,
    }).populate("vehicles");

    if (!owner) {
      throw new Error("Owner not found");
    }
    return owner;
  } catch (error) {
    throw new Error(`Error updating owner: ${error.message}`);
  }
};

// Delete an Owner
const deleteOwner = async (ownerId) => {
  try {
    const owner = await Owner.findByIdAndDelete(ownerId);
    if (!owner) {
      throw new Error("Owner not found");
    }
    return owner;
  } catch (error) {
    throw new Error(`Error deleting owner: ${error.message}`);
  }
};

// Get All Owners
const getAllOwners = async () => {
  try {
    const owners = await Owner.find().populate("vehicles");
    return owners;
  } catch (error) {
    throw new Error(`Error retrieving owners: ${error.message}`);
  }
};

// Get Owners by Location (Example)
const getOwnersByLocation = async (location) => {
  try {
    const owners = await Owner.find({ location }).populate("vehicles");
    return owners;
  } catch (error) {
    throw new Error(`Error retrieving owners by location: ${error.message}`);
  }
};

module.exports = {
  createOwner,
  getOwnerById,
  updateOwner,
  deleteOwner,
  getAllOwners,
  getOwnersByLocation,
};
