const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
    minLength: [3, "Name must be more or equal 3  characters"],
    maxLength: [30, "Name must not be more or equal 30 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "User must have an email"],
    validate: [validator.isEmail, "Provide a valid Email"],
    trim: true,
    lowercase: true,
    unique: [true, "This emil is taken by another user"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "User must have a password"],
    minLength: [8, "Password must have more or equal 8 characters"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Password confirm is required"],
  },
});

const User = mongoose.Model("User", userSchema);
module.exports = User;
