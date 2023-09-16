const User = require("./../models/userModel");

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      message: "Waiting for the database connection.",
    },
  });
};

exports.getUser = (req, res) => {
  const params = req.params.id;
  console.log(params);

  res.status(200).json({
    status: "success",
    data: {
      message: "Waiting for the database connection.",
    },
  });
};

exports.createUser = (req, res) => {
  const tour = req.body;

  res.status(201).json({
    status: "success",
    data: {
      tour,
    },
  });
};

exports.updateUser = (req, res) => {
  console.log(`Update the user ${req.params.id} with`, req.body);

  res.status(200).json({
    status: "success",
    data: {
      message: "Waiting for the database connection.",
    },
  });
};

exports.deleteUser = (req, res) => {
  console.log(`Delete user ${req.params.id}`);

  res.status(204).json({
    status: "success",
    data: null,
  });
};
