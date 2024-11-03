const { every, includes } = require("lodash");
const Vehicle = require("../models/vehicle");
const { getUserByFBId } = require("./user");

const getIsRecordAlreadyExist = async payload => {
  const { registration_number, chassis_number, engine_number } = payload;
  const recordsByRegNo = await Vehicle.find({ registration_number });
  const recordsByChNo = await Vehicle.find({ chassis_number });
  const recordsByEngNo = await Vehicle.find({ engine_number });
  return recordsByRegNo.length + recordsByChNo.length + recordsByEngNo.length > 0;
};

// Create a Vehicle
const createVehicle = async ({ payload }) => {
  try {
    const createdBy = await getUserByFBId(payload?.created_by);
    const isRecordAlreadyExist = await getIsRecordAlreadyExist(payload);
    if (isRecordAlreadyExist) throw Error("Record already exist");
    const vehicle = new Vehicle({
      ...payload,
      created_by: createdBy,
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

const getIsValidUpdatePayload = payload => {
  if (payload && Object.keys(payload).length) {
    const payloadKeys = Object.keys(payload);
    const whitelistKeys = ["name", "registration_number", "owner"];
    return every(payloadKeys, key => includes(whitelistKeys, key));
  } else {
    return false;
  }
};

// Update a Vehicle
const updateVehicle = async (vehicleId, updateData) => {
  try {
    const isValidPayload = getIsValidUpdatePayload(updateData);
    if (!isValidPayload) throw Error("Invalid Request");
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

const getIsValidQueryParams = query => {
  if (!query) return true;
  const queryKeys = Object.keys(query);
  const whitelistKeys = ["name", "registration_number", "chassis_number", "engine_number", "owner", "created_by"];
  return every(queryKeys, key => includes(whitelistKeys, key));
};

// Get All Vehicles
const getAllVehicles = async query => {
  try {
    if (!getIsValidQueryParams(query)) {
      throw Error("Invalid request");
    }
    const { page, page_size, ...rest } = query || {};
    const vehicles = await Vehicle.find(rest).populate("owner");
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
