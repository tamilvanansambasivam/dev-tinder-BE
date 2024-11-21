const express = require("express");
const User = require("./models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");

const app = express();
const connectDB = require("./config/database");
const PORT = 3000;

app.use(express.json());

app.post("/sign-up", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate input fields

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send("All fields are required");
    }
    // Use validator.js to validate the email and password
    if (!validator.isEmail(email)) {
      return res.status(400).send("Invalid email address");
    }

    if (
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return res
        .status(400)
        .send(
          "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a symbol"
        );
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password, // Note: Ensure to hash passwords before saving in production!
    });
    await user.save();
    res.status(201).send("User is created");
  } catch (err) {
    if (err.code === 11000) {
      // MongoDB Duplicate Key Error
      return res
        .status(400)
        .send("Email already in use. Please try a different one.");
    }
    console.error(err); // Log the error for debugging
    res.status(500).send("Error occurred during sign-up");
  }
});
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
