const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next(); //Everything is ok, keep moving
  }

  //IF exists errors
  return res.status(400).json({
    success: false,
    message: "Bad Request - validation failed",
    errors: errors.array().map((e) => ({
      field: e.path,
      message: e.msg,
    })),
  });
};
