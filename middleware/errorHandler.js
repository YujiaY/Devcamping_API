const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  // TODO: Try to omit this
  error.message = err.message;

  //Log to console for dev
  // console.log(`${err.name.red}: ${err.value}`);
  console.log(err.name.red);
  // console.log(err);

  //Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `${err.value} is not a valid ObjectId. Please check again.`;
    error = new ErrorResponse(message, 404);
  }

  //Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field: ${Object.keys(
      err.keyValue
    )}, value: ${Object.values(err.keyValue)}.`;
    error = new ErrorResponse(message, 400);
  }

  //Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error."
  });
};

module.exports = errorHandler;
