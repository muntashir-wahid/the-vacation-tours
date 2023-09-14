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
    sendErrorProd(err, res);
  }
};
