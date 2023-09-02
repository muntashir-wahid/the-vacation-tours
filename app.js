const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.json());
app.use(morgan("dev"));

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

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`The vacation tours app is running on port ${PORT}`);
});
