const Vehicle = require("../models/vehicle");

// Create a Vehicle
const createVehicle = async (name, registrationNumber, chassisNumber, engineNumber, createdBy, ownerId) => {
  try {
    const vehicle = new Vehicle({
      name,
      registration_number: registrationNumber,
      chassis_number: chassisNumber,
      engine_number: engineNumber,
      created_by: createdBy,
      owner: ownerId,
    });
    await vehicle.save();
    return vehicle;
  } catch (error) {
    throw new Error(`Error creating vehicle: ${error.message}`);
  }
};

// Get Vehicle by ID
const getVehicleById = async vehicleId => {
  try {
    const vehicle = await Vehicle.findById(vehicleId).populate("owner");
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }
    return vehicle;
  } catch (error) {
    throw new Error(`Error retrieving vehicle: ${error.message}`);
  }
};

// Update a Vehicle
const updateVehicle = async (vehicleId, updateData) => {
  try {
    const vehicle = await Vehicle.findByIdAndUpdate(vehicleId, updateData, {
      new: true,
      runValidators: true,
    }).populate("owner");

    if (!vehicle) {
      throw new Error("Vehicle not found");
    }
    return vehicle;
  } catch (error) {
    throw new Error(`Error updating vehicle: ${error.message}`);
  }
};

// Delete a Vehicle
const deleteVehicle = async vehicleId => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(vehicleId);
    if (!vehicle) {
      throw new Error("Vehicle not found");
    }
    return vehicle;
  } catch (error) {
    throw new Error(`Error deleting vehicle: ${error.message}`);
  }
};

// Get All Vehicles
const getAllVehicles = async () => {
  try {
    const vehicles = await Vehicle.find().populate("owner");
    return vehicles;
  } catch (error) {
    throw new Error(`Error retrieving vehicles: ${error.message}`);
  }
};

// Get Vehicles by Owner ID
const getVehiclesByOwnerId = async ownerId => {
  try {
    const vehicles = await Vehicle.find({ owner: ownerId }).populate("owner");
    return vehicles;
  } catch (error) {
    throw new Error(`Error retrieving vehicles by owner: ${error.message}`);
  }
};

module.exports = {
  createVehicle,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  getAllVehicles,
  getVehiclesByOwnerId,
};
