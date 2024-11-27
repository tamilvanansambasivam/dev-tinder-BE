const User = require("../models/user");

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(req.body);
    console.log(req.cookies);
    res.send(user);
  } catch (err) {
    console.log("Something went wrong while getting user ");
    res.statusCode(404).send("something went wrong");
  }
};

module.exports = getUser;
