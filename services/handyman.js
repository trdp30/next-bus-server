const Handyman = require("../models/handyman");

// Create a Handyman
const createHandyman = async (userId, vehicles = []) => {
  try {
    const handyman = new Handyman({ user_id: userId, vehicles });
    await handyman.save();
    return handyman;
  } catch (error) {
    throw new Error(`Error creating handyman: ${error.message}`);
  }
};

// Get Handyman by ID
const getHandymanById = async (handymanId) => {
  try {
    const handyman = await Handyman.findById(handymanId).populate("vehicles");
    if (!handyman) {
      throw new Error("Handyman not found");
    }
    return handyman;
  } catch (error) {
    throw new Error(`Error retrieving handyman: ${error.message}`);
  }
};

// Update a Handyman
const updateHandyman = async (handymanId, updateData) => {
  try {
    const handyman = await Handyman.findByIdAndUpdate(handymanId, updateData, {
      new: true,
      runValidators: true,
    }).populate("vehicles");

    if (!handyman) {
      throw new Error("Handyman not found");
    }
    return handyman;
  } catch (error) {
    throw new Error(`Error updating handyman: ${error.message}`);
  }
};

// Delete a Handyman
const deleteHandyman = async (handymanId) => {
  try {
    const handyman = await Handyman.findByIdAndDelete(handymanId);
    if (!handyman) {
      throw new Error("Handyman not found");
    }
    return handyman;
  } catch (error) {
    throw new Error(`Error deleting handyman: ${error.message}`);
  }
};

// Get All Handymen
const getAllHandymen = async () => {
  try {
    const handymen = await Handyman.find().populate("vehicles");
    return handymen;
  } catch (error) {
    throw new Error(`Error retrieving handymen: ${error.message}`);
  }
};

// Get Handymen by Vehicle ID
const getHandymenByVehicleId = async (vehicleId) => {
  try {
    const handymen = await Handyman.find({ vehicles: vehicleId }).populate(
      "vehicles",
    );
    return handymen;
  } catch (error) {
    throw new Error(`Error retrieving handymen by vehicle: ${error.message}`);
  }
};

module.exports = {
  createHandyman,
  getHandymanById,
  updateHandyman,
  deleteHandyman,
  getAllHandymen,
  getHandymenByVehicleId,
};
