const { model } = require("mongoose");

const is_Authenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "You need to login" });
};

module.exports = is_Authenticated;
