const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    carName: {
      type: String,
      required: true,
      unique: true,
    },
    carType: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    fuelCapacity: {
      type: Number,
      required: true,
    },
    transmission: {
      type: String,
      required: true,
    },
    seatingCapacity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Car", CarSchema);
