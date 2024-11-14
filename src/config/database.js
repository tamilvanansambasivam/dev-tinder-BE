const mongoose = require("mongoose");

async function connectDB() {
  return mongoose
    .connect(
      "mongodb+srv://demo:wwD2xc1nxQcIfcds@cluster0.xhzxtxe.mongodb.net/devTinder"
    )
    .then(() => {
      console.log("mongodb is connected");
    });
}

module.exports = connectDB;
