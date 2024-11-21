const express = require("express");
const User = require("./models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
const signup = require("./routes/signup");
const app = express();
const connectDB = require("./config/database");
const PORT = 3000;

app.use(express.json());

app.post("/sign-up", signup);
// get specific users by email
// get all APIs from db

app.get("/user", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(req.body);
    res.send(user);
  } catch (err) {
    console.log("Something went wrong while getting user ");
    res.statusCode(404).send("something went wrong");
  }
});

app.get("/all-users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    console.log("something went wrong while getting all users");
    res.send("something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const user = await User.findOneAndUpdate(
    { firstName: "tamil" },
    { firstName: "tamilvanan" },

    { new: true }
  )
    .then((user) => {
      console.log(user);
      res.send(user); // Send the updated user.
    })
    .catch((error) => {
      console.log(error);
      res.send("something went wrong");
    });
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("error occur when connecting db");
  });
