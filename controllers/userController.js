const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const { deleteOne, getOne, updateOne } = require("./handlerFactory");
const User = require("./../models/userModel");

exports.getAllUsers = catchAsync(async (req, res) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .limitFields()
    .sort()
    .paginate()
    .search();

  // Execute the query
  const users = await features.query;

  // Send the response
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = getOne(User, "user");
exports.updateUser = updateOne(User, "user");
exports.deleteUser = deleteOne(User);
