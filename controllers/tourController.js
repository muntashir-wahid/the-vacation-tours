const Tour = require("./../models/tourModel");

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: "success",
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Something went wrong",
      data: {
        error,
      },
    });
  }
};

exports.updateTour = (req, res) => {
  console.log(`Update the tour ${req.params.id} with`, req.body);

  res.status(200).json({
    status: "success",
    data: {
      message: "Waiting for the database connection.",
    },
  });
};

exports.deleteTour = (req, res) => {
  console.log(`Delete tour ${req.params.id}`);

  res.status(204).json({
    status: "success",
    data: null,
  });
};
