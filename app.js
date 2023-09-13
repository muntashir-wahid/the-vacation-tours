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

app.all("*", (req, res) => {
  console.log(req.url, req.method);
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} for ${req.method} method on the server!.`,
  });
});

module.exports = app;
