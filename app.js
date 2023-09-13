const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/userRouter");
const tourRouter = require("./routes/tourRouter");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  const error = new Error(
    `Can't find ${req.originalUrl} for ${req.method} method on the server!.`
  );
  (error.status = "fail"), (error.statusCode = 404);

  next(error);
});

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || "Something went wrong",
  });
});

module.exports = app;
