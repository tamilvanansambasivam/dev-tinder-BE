const express = require("express");
var cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const allRoutes = require("./routes/allRoutes");
const PORT = 3000;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", allRoutes);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("error occur when connecting db");
  });
