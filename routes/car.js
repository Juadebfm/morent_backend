const express = require("express");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");
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

//delete car
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Car Has Been Deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get a single car
router.get("/find/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get All Cars
router.get("/", async (req, res) => {
  const queryNew = req.query.new;
  const queryCarType = req.query.carType;

  try {
    let cars;
    if (queryNew === "true") {
      cars = await Car.find().sort({ createdAt: -1 }).limit(5);
    } else if (queryCarType) {
      cars = await Car.find({
        carType: { $regex: new RegExp(queryCarType, "i") },
      });
    } else {
      cars = await Car.find();
    }

    res.status(200).json(cars);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
});

module.exports = router; // Export the router
