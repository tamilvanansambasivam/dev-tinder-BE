const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    console.log("cookies: ", req.cookies);
    const { token } = req.cookies;
    if (!token) {
      throw new Error("token is not valid");
    }
    const decodedObj = await jwt.verify(token, "my secret key");
    console.log(decodedObj);
    const { id } = decodedObj;
    const user = await User.findById(id);
    console.log(user);
    if (!user) {
      throw new Error("user not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("error: " + err.message);
  }
};

module.exports = {
  userAuth,
};
