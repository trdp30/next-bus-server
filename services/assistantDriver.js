const AssistantDriver = require("../models/assistantDriver");

// Create an Assistant Driver
const createAssistantDriver = async (userId, vehicles = []) => {
  try {
    const assistantDriver = new AssistantDriver({ user_id: userId, vehicles });
    await assistantDriver.save();
    return assistantDriver;
  } catch (error) {
    throw new Error(`Error creating assistant driver: ${error.message}`);
  }
};

// Get Assistant Driver by ID
const getAssistantDriverById = async (assistantDriverId) => {
  try {
    const assistantDriver =
      await AssistantDriver.findById(assistantDriverId).populate("vehicles");
    if (!assistantDriver) {
      throw new Error("Assistant driver not found");
    }
    return assistantDriver;
  } catch (error) {
    throw new Error(`Error retrieving assistant driver: ${error.message}`);
  }
};

// Update an Assistant Driver
const updateAssistantDriver = async (assistantDriverId, updateData) => {
  try {
    const assistantDriver = await AssistantDriver.findByIdAndUpdate(
      assistantDriverId,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    ).populate("vehicles");

    if (!assistantDriver) {
      throw new Error("Assistant driver not found");
    }
    return assistantDriver;
  } catch (error) {
    throw new Error(`Error updating assistant driver: ${error.message}`);
  }
};

// Delete an Assistant Driver
const deleteAssistantDriver = async (assistantDriverId) => {
  try {
    const assistantDriver =
      await AssistantDriver.findByIdAndDelete(assistantDriverId);
    if (!assistantDriver) {
      throw new Error("Assistant driver not found");
    }
    return assistantDriver;
  } catch (error) {
    throw new Error(`Error deleting assistant driver: ${error.message}`);
  }
};

// Get All Assistant Drivers
const getAllAssistantDrivers = async () => {
  try {
    const assistantDrivers = await AssistantDriver.find().populate("vehicles");
    return assistantDrivers;
  } catch (error) {
    throw new Error(`Error retrieving assistant drivers: ${error.message}`);
  }
};

// Get Assistant Drivers by Vehicle ID
const getAssistantDriversByVehicleId = async (vehicleId) => {
  try {
    const assistantDrivers = await AssistantDriver.find({
      vehicles: vehicleId,
    }).populate("vehicles");
    return assistantDrivers;
  } catch (error) {
    throw new Error(
      `Error retrieving assistant drivers by vehicle: ${error.message}`,
    );
  }
};

module.exports = {
  createAssistantDriver,
  getAssistantDriverById,
  updateAssistantDriver,
  deleteAssistantDriver,
  getAllAssistantDrivers,
  getAssistantDriversByVehicleId,
};
