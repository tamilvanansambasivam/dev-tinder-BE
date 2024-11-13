function test(req, res, next) {
  console.log("hello from middleware");
  next();
}

module.exports = test;
