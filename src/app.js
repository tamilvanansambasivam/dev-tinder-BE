const express = require("express");
const app = express();
const PORT = 3000;

app.get(
  "/",
  (req, res, next) => {
    console.log("1st route");
    next();
  },
  (req, res, next) => {
    console.log("2nd route");

    next();
  },
  [
    (req, res, next) => {
      console.log("3rd route");
      next();
    },
    (req, res, next) => {
      console.log("4th route");
      next();
    },
  ],
  (req, res) => {
    res.send("hello world");
  }
);

app.get("/users", (req, res) => {
  res.send("users from get request");
});

app.post("/users", (req, res) => {
  res.send("users successfully posted");
});

app.patch("/users", (req, res) => {
  res.send("user updated successfully");
});

app.delete("/users", (req, res) => {
  res.send("users successfully deleted");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
