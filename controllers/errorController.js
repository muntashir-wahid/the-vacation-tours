const AppError = require("../utils/appError");

const handleCastErrorDb = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDuplicateFieldDb = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name}. Try with another one.`;

  return new AppError(message, 400);
};

const handleValidationDb = (err) => {
  const errors = Object.values(err.errors)
    .map((val) => val.message)
    .join(", ");

  const message = `Invalid input data: ${errors}`;

  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please login again.", 401);

const handleExpireTokenError = () =>
  new AppError("Your token has expired. Please login again.", 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational Errors: Trusted, so send the message to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming Errors: Unknown, so don't send that message to the client
  } else {
    // First: Log the error to the console
    console.error(err);
    // Second: Send the generic message to the client
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

module.exports = (err, _, res, __) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    // let error = { ...err };
    // Invalid ID error
    if (err.name === "CastError") err = handleCastErrorDb(err);
    // Duplicate field error
    if (err.code === 11000) err = handleDuplicateFieldDb(err);
    // Handle validation errors
    if (err.name === "ValidationError") err = handleValidationDb(err);
    // Handle JWT Error
    if (err.name === "JsonWebTokenError") err = handleJWTError();
    // Handle token expire error
    if (err.name === "TokenExpiredError") err = handleExpireTokenError();

    sendErrorProd(err, res);
  }
};
