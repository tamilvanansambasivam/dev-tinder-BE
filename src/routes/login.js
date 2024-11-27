const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// in login api, after email and password validation, create JWT token and send it back to user

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    // Find user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const secretKey = "my secret key";
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, secretKey, { expiresIn: 60 * 60 });
    console.log(token);
    res.cookie("token", token);

    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = login;
