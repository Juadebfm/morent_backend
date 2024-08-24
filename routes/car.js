const express = require("express");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middleware/verifyToken");
const Car = require("../models/Car");

const router = express.Router();

//create a car
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newCar = new Car(req.body);

  try {
    const savedCar = await newCar.save();
    res.status(200).json(savedCar);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update Car
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },

      { new: true }
    );
    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router; // Export the router
