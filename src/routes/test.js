const test = function (req, res) {
  res.cookie("token", "tamilcreatedcookie");
  console.log("Cookies: ", req.cookies);

  res.send("cookie reading");
};

module.exports = test;
