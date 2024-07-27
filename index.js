const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Established"))
  .catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
  console.log("Backend Services Is Running");
});
