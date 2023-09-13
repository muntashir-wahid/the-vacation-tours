class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";

    // Property will only be available on Operational errors
    this.isOperational = true;

    // Capture StackTrace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
