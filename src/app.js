const express = require("express");
const User = require("./models/user");

const app = express();
const connectDB = require("./config/database");
const PORT = 3000;

app.post("/sign-up", (req, res) => {
  const user = new User({
    firstName: "tamil",
    lastName: "vanan",
    email: "tamilvanan@email.com",
    password: "tamilvanan@123",
  });

  try {
    user.save();
    res.send("user is created");
  } catch (err) {
    res.send("error happen when sign-up");
  }
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("error occur when connecting db");
  });
