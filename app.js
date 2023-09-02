const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "Waiting for the database connection.",
    },
  });
};

const getTour = (req, res) => {
  const params = req.params.id;
  console.log(params);

  res.status(200).json({
    status: "success",
    data: {
      message: "Waiting for the database connection.",
    },
  });
};

const createTour = (req, res) => {
  const tour = req.body;

  res.status(201).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const updateTour = (req, res) => {
  console.log(`Update the tour ${req.params.id} with`, req.body);

  res.status(200).json({
    status: "success",
    data: {
      message: "Waiting for the database connection.",
    },
  });
};

const deleteTour = (req, res) => {
  console.log(`Delete tour ${req.params.id}`);

  res.status(204).json({
    status: "success",
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "Waiting for the database connection.",
    },
  });
};

const getUser = (req, res) => {
  const params = req.params.id;
  console.log(params);

  res.status(200).json({
    status: "success",
    data: {
      message: "Waiting for the database connection.",
    },
  });
};

const createUser = (req, res) => {
  const tour = req.body;

  res.status(201).json({
    status: "success",
    data: {
      tour,
    },
  });
};

const updateUser = (req, res) => {
  console.log(`Update the user ${req.params.id} with`, req.body);

  res.status(200).json({
    status: "success",
    data: {
      message: "Waiting for the database connection.",
    },
  });
};

const deleteUser = (req, res) => {
  console.log(`Delete user ${req.params.id}`);

  res.status(204).json({
    status: "success",
    data: null,
  });
};

const tourRouter = express.Router();
tourRouter.route("/").get(getAllTours).post(createTour);
tourRouter.route("/:id").get(getTour).patch(updateTour).delete(deleteTour);

const userRouter = express.Router();
userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`The vacation tours app is running on port ${PORT}`);
});
