const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const signup = async (req, res) => {
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

    const saltRounds = 10; // Number of salt rounds

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store the hashed password
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
};

module.exports = signup;
