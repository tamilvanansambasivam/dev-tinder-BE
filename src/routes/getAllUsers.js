const User = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    console.log("something went wrong while getting all users");
    res.send("something went wrong");
  }
};

module.exports = getAllUsers;
