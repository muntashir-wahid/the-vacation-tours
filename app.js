const express = require("express");
const morgan = require("morgan");

const userRouter = require("./routes/userRouter");
const tourRouter = require("./routes/tourRouter");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`The vacation tours app is running on port ${PORT}`);
});
