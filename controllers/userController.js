const { deleteOne, getAll, getOne, updateOne } = require("./handlerFactory");
const User = require("./../models/userModel");

exports.getAllUsers = getAll(User, "users");
exports.getUser = getOne(User, "user");
exports.updateUser = updateOne(User, "user");
exports.deleteUser = deleteOne(User);
