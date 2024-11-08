const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/users", (req, res) => {
  res.send("users from get request");
});

app.post("/users", (req, res) => {
  res.send("users successfully posted");
});

app.delete("/users", (req, res) => {
  res.send("users successfully deleted");
});

app.patch("/users", (req, res) => {
  res.send("user updated successfully");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
