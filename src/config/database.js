const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  return mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("mongodb is connected");
  });
}

module.exports = connectDB;
