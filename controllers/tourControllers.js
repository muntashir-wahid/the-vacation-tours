exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "Waiting for the database connection.",
    },
  });
};

exports.getTour = (req, res) => {
  const params = req.params.id;
  console.log(params);

  res.status(200).json({
    status: "success",
    data: {
      message: "Waiting for the database connection.",
    },
  });
};

exports.createTour = (req, res) => {
  const tour = req.body;

  res.status(201).json({
    status: "success",
    data: {
      tour,
    },
  });
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
