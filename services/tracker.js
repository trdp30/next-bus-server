const { every, includes } = require("lodash");
const Tracker = require("../models/tracker");
const { getUserByFBId } = require("./user");

const getIsRecordAlreadyExist = async payload => {
  const { vehicle, date } = payload;
  const records = await Tracker.find({ vehicle, date });
  return records.length > 0;
};

// Create a Tracker
const createTracker = async ({ payload }) => {
  try {
    const createdBy = await getUserByFBId(payload?.created_by);
    const isRecordAlreadyExist = await getIsRecordAlreadyExist(payload);
    if (isRecordAlreadyExist) throw Error("Journey already started for the day.");
    const tracker = new Tracker({
      ...payload,
      created_by: createdBy,
    });
    await tracker.save();
    return tracker;
  } catch (error) {
    throw new Error(`Error creating tracker: ${error.message}`);
  }
};

// Get Tracker by ID
const getTrackerById = async trackerId => {
  try {
    const vehicle = await Tracker.findById(trackerId);
    if (!vehicle) {
      throw new Error("Tracker not found");
    }
    return vehicle;
  } catch (error) {
    throw new Error(`Error retrieving tracker: ${error.message}`);
  }
};

// const getIsValidUpdatePayload = payload => {
//   if (payload && Object.keys(payload).length) {
//     const payloadKeys = Object.keys(payload);
//     const whitelistKeys = ["name", "registration_number", "owner"];
//     return every(payloadKeys, key => includes(whitelistKeys, key));
//   } else {
//     return false;
//   }
// };

// Update a Tracker
// const updateTracker = async (vehicleId, updateData) => {
//   try {
//     const isValidPayload = getIsValidUpdatePayload(updateData);
//     if (!isValidPayload) throw Error("Invalid Request");
//     const vehicle = await Tracker.findByIdAndUpdate(vehicleId, updateData, {
//       new: true,
//       runValidators: true,
//     }).populate("owner");

//     if (!vehicle) {
//       throw new Error("Tracker not found");
//     }
//     return vehicle;
//   } catch (error) {
//     throw new Error(`Error updating vehicle: ${error.message}`);
//   }
// };

// Delete a Tracker
const deleteTracker = async trackerId => {
  try {
    const vehicle = await Tracker.findByIdAndDelete(trackerId);
    if (!vehicle) {
      throw new Error("Tracker not found");
    }
    return vehicle;
  } catch (error) {
    throw new Error(`Error deleting tracker: ${error.message}`);
  }
};

const getIsValidQueryParams = query => {
  if (!query) return true;
  const queryKeys = Object.keys(query);
  const whitelistKeys = ["driver", "vehicle", "date", "started_from", "id"];
  return every(queryKeys, key => includes(whitelistKeys, key));
};

// Get All Trackers
const getAllTrackers = async query => {
  try {
    if (!getIsValidQueryParams(query)) {
      throw Error("Invalid request");
    }
    const { page, page_size, ...rest } = query || {};
    const trackers = await Tracker.find(rest);
    return trackers;
  } catch (error) {
    throw new Error(`Error retrieving trackers: ${error.message}`);
  }
};

// const getIsValidUpdatePayload = payload => {
//   if (payload && Object.keys(payload).length) {
//     const payloadKeys = Object.keys(payload);
//     const whitelistKeys = [];
//     return every(payloadKeys, key => includes(whitelistKeys, key));
//   } else {
//     return false;
//   }
// };

// Update a Tracker Log
const addTrackerLog = async (trackerId, updateData) => {
  try {
    // const isValidPayload = getIsValidUpdatePayload(updateData);
    // if (!isValidPayload) throw Error("Invalid Request");
    const trackerLogs = updateData;
    const tracker = await Tracker.findByIdAndUpdate(
      trackerId,
      { $push: { trackerLogs } },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!tracker) {
      throw new Error("Tracker not found");
    }
    return tracker;
  } catch (error) {
    throw new Error(`Error updating tracker: ${error.message}`);
  }
};

module.exports = {
  createTracker,
  getTrackerById,
  deleteTracker,
  getAllTrackers,
  addTrackerLog,
};
