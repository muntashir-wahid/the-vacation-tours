const express = require("express");
const morgan = require("morgan");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const reviewRouter = require("./routes/reviewRouter");
const tourRouter = require("./routes/tourRouter");
const userRouter = require("./routes/userRouter");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);

app.all("*", (req, _, next) => {
  next(
    new AppError(
      `Can't find ${req.originalUrl} for ${req.method} method on the server!.`,
      404
    )
  );
});

app.use(globalErrorHandler);

module.exports = app;
