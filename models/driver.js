const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      trim: true,
    },
    vehicles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle", // This references the 'Vehicle' model
      },
    ],
    pan: {
      type: String,
      trim: true,
    },
    works_for: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Owner",
    },
  },
  {
    timestamps: true,
  },
);

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;

/* 
  Get all the vehicles tagged to the driver.
    - And let the driver select the vehicle to drive.

    - If no vehicle found, the vehicles need to fetch through the owner'.
      - Get the owner details tagged to the driver.
        - If no owner found, the drive need to register to a owner first.
          The owner can be the same person as well as other person.

        - If owner found, return the owner details. And fetch all the vehicles available to the owner.
        - If no vehicle found, the owner need to register a vehicle first.
        - If owner not available currently then let the driver add a vehicle to the owner.

  If vehicle found, return the vehicle where the current drive is tagged.


  // Get all vehicles list
  // Then find the vehicle by where the driver is the tag to the vehicle
  // If multiple vehicles are found, return all the vehicles
  // If no vehicle found
*/
