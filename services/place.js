const Place = require("../models/place");
const { getUserByFBId } = require("./user");

// Create a Place
const createPlace = async (payload) => {
  try {
    const createdBy = await getUserByFBId(payload?.created_by);
    const place = new Place({ ...payload, created_by: createdBy });
    const res = await place.save();
    return res;
  } catch (error) {
    throw new Error(`Error creating place: ${error.message}`);
  }
};

// Get Place by ID
const getPlaceById = async (placeId) => {
  try {
    const place = await Place.findById(placeId);
    if (!place) {
      throw new Error("Place not found");
    }
    return place;
  } catch (error) {
    throw new Error(`Error retrieving place: ${error.message}`);
  }
};

// Update a Place
const updatePlace = async (placeId, updateData) => {
  try {
    const place = await Place.findByIdAndUpdate(placeId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!place) {
      throw new Error("Place not found");
    }
    return place;
  } catch (error) {
    throw new Error(`Error updating place: ${error.message}`);
  }
};

// Delete a Place
const deletePlace = async (placeId) => {
  try {
    const place = await Place.findByIdAndDelete(placeId);
    if (!place) {
      throw new Error("Place not found");
    }
    return place;
  } catch (error) {
    throw new Error(`Error deleting place: ${error.message}`);
  }
};

// Get All Places
const getAllPlaces = async () => {
  try {
    const places = await Place.find();
    return places;
  } catch (error) {
    throw new Error(`Error retrieving places: ${error.message}`);
  }
};

// Get Places by Location (Example using GeoJSON)
const getPlacesByLocation = async (location) => {
  try {
    // Assuming location is a GeoJSON Point object
    const places = await Place.find({
      location: {
        $geoWithin: { $centerSphere: [location.coordinates, 10 / 3963.191] }, // 10 miles radius
      },
    });
    return places;
  } catch (error) {
    throw new Error(`Error retrieving places by location: ${error.message}`);
  }
};

module.exports = {
  createPlace,
  getPlaceById,
  updatePlace,
  deletePlace,
  getAllPlaces,
  getPlacesByLocation,
};
