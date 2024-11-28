const express = require("express");
var cookieParser = require("cookie-parser");
const User = require("./models/user");
const signup = require("./routes/signup");
const login = require("./routes/login");
const profile = require("./routes/profile");
const test = require("./routes/test");
const connectDB = require("./config/database");
const getAllUsers = require("./routes/getAllUsers");
const getUser = require("./routes/getUser");
const { userAuth } = require("./middleware/auth");
const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.get("/test", test);

app.post("/sign-up", signup);

app.get("/login", login);

app.get("/profile", userAuth, profile);

app.get("/user", getUser);

app.get("/all-users", getAllUsers);

app.patch("/user", async (req, res) => {
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

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("error occur when connecting db");
  });
