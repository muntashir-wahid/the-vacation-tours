const bcrypt = require("bcryptjs");
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
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "Password confirm is required"],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Password didn't match",
    },
  },
});

userSchema.pre("save", async function (next) {
  // Guard clause for checking is the password modified
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

userSchema.post("save", function (doc, next) {
  // Remove the password field from the saved document
  doc.password = undefined;
  doc.__v = undefined;

  next();
});

userSchema.methods.checkPasswordIsCorrect = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
