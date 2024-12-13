const logout = async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("user logged out");
};

module.exports = logout;
