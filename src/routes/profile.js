const User = require("../models/user");

const jwt = require("jsonwebtoken");

const profile = async (req, res) => {
  // read the cookies inside profile API and find logged in user

  try {
    const token = req.cookies.token; // Assuming the token is stored in a cookie named 'token'
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided." });
    }

    console.log(token);
    const secretKey = "my secret key"; // Use the same secret key as used for signing
    const decoded = jwt.verify(token, secretKey); // Verify and decode the token

    // Find the user by ID from the decoded token payload
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res
      .status(200)
      .json({ message: "User profile fetched successfully!", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
};

module.exports = profile;
