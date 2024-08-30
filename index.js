const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const carRoute = require("./routes/car");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

dotenv.config();

// connect our code to the database (MongoDB)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Successfully Connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Use the route
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/cars", carRoute);
app.use("/api/cart", cartRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);

// to listen to the application
app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running on port 3000");
});
