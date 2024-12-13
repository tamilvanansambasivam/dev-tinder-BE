const express = require("express");
const test = require("./test");
const signup = require("./signup");
const login = require("./login");
const { userAuth } = require("../middleware/auth");
const profile = require("./profile");
const getUser = require("./getUser");
const getAllUsers = require("./getAllUsers");
const User = require("../models/user");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("home");
});
router.get("/test", test);

router.get("/login", login);

router.get("/profile", userAuth, profile);

router.get("/user", getUser);

router.get("/all-users", getAllUsers);

router.post("/sign-up", signup);

router.patch("/user", async (req, res) => {
  const user = await User.findOneAndUpdate(
    { firstName: "tamil" },
    { firstName: "tamilvanan" },

    { new: true }
  )
    .then((user) => {
      console.log(user);
      res.send(user);
    })
    .catch((error) => {
      console.log(error);
      res.send("something went wrong");
    });
});

module.exports = router;
