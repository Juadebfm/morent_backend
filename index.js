const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const carRoute = require("./routes/car");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");

dotenv.config();

const stripeRoute = require("./routes/stripe");

// connect our code to the database (MongoDB)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database Successfully Connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Because when you get to the frontend to test stripe, you will encounter something called CORS error, cross origin resource error

app.use(cors());
//Use the route
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/cars", carRoute);
app.use("/api/cart", cartRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

// to listen to the application
app.listen(process.env.PORT || 3001, () => {
  console.log("Server is running on port 3000");
});
