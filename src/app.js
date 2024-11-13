const express = require("express");
const test = require("./middleware/index");

const app = express();
const PORT = 3000;
// test middleware
app.use(test);
app.get("/", (req, res) => {
  res.send("middleware is successfully tested");
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
