const Driver = require("../models/driver");

// Create a Driver
const createDriver = async (userId, vehicles = []) => {
  try {
    const driver = new Driver({ user_id: userId, vehicles });
    await driver.save();
    return driver;
  } catch (error) {
    throw new Error(`Error creating driver: ${error.message}`);
  }
};

// Get Driver by ID
const getDriverById = async (driverId) => {
  try {
    const driver = await Driver.findById(driverId).populate("vehicles");
    if (!driver) {
      throw new Error("Driver not found");
    }
    return driver;
  } catch (error) {
    throw new Error(`Error retrieving driver: ${error.message}`);
  }
};

// Update a Driver
const updateDriver = async (driverId, updateData) => {
  try {
    const driver = await Driver.findByIdAndUpdate(driverId, updateData, {
      new: true,
      runValidators: true,
    }).populate("vehicles");

    if (!driver) {
      throw new Error("Driver not found");
    }
    return driver;
  } catch (error) {
    throw new Error(`Error updating driver: ${error.message}`);
  }
};

// Delete a Driver
const deleteDriver = async (driverId) => {
  try {
    const driver = await Driver.findByIdAndDelete(driverId);
    if (!driver) {
      throw new Error("Driver not found");
    }
    return driver;
  } catch (error) {
    throw new Error(`Error deleting driver: ${error.message}`);
  }
};

// Get All Drivers
const getAllDrivers = async () => {
  try {
    const drivers = await Driver.find().populate("vehicles");
    return drivers;
  } catch (error) {
    throw new Error(`Error retrieving drivers: ${error.message}`);
  }
};

// Get Drivers by Vehicle ID
const getDriversByVehicleId = async (vehicleId) => {
  try {
    const drivers = await Driver.find({ vehicles: vehicleId }).populate(
      "vehicles",
    );
    return drivers;
  } catch (error) {
    throw new Error(`Error retrieving drivers by vehicle: ${error.message}`);
  }
};

module.exports = {
  createDriver,
  getDriverById,
  updateDriver,
  deleteDriver,
  getAllDrivers,
  getDriversByVehicleId,
};
