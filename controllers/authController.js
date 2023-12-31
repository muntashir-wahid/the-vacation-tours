const crypto = require("crypto");
const { promisify } = require("util");

const jwt = require("jsonwebtoken");

const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const { getOne } = require("./handlerFactory");
const sendEmail = require("./../utils/email");
const User = require("./../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
};

const filterObj = (obj, ...fields) => {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    if (fields.includes(key)) {
      newObj[key] = obj[key];
    }
  });

  return newObj;
};

exports.signup = catchAsync(async (req, res, next) => {
  // Create a user
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkPasswordIsCorrect(password, user.password))) {
    return next(new AppError("No user found with that credentials", 401));
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // Get and check token token in the header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in. Please login to get the access", 401)
    );
  }

  // Verify token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if the user is currently available
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError("The user belonging to token does no longer exit", 401)
    );
  }

  // Check if the password changed after the token issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User changed password recently! Please login again", 401)
    );
  }

  // Grant access to the protected route
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("No user found with that email", 404));
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  const message = `You can reset you password. \n${req.protocol}://${req.hostname}/api/v1/users/reset-password/${resetToken}`;

  try {
    await sendEmail({ email: user.email, message });

    return res.status(200).json({
      status: "success",
      message: "An email was sent to you email address to reset the password.",
    });
  } catch (error) {
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;

    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("Something went wrong. Please try again later", 500)
    );
  }
};

exports.resetPassword = catchAsync(async (req, res, next) => {
  // Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gte: Date.now() },
  });

  // If the token does not expired and the user exist, set the new password

  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // Log the user in, send the JWT
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // Get the user from the collection
  const user = await User.findById(req.user._id).select("+password");
  if (!(await user.checkPasswordIsCorrect(req.body.password, user.password))) {
    return next(new AppError("Given password is not correct", 401));
  }

  user.password = req.body.newPassword;
  user.confirmPassword = req.body.confirmNewPassword;
  await user.save();

  // Log the user in, send the JWT
  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    message: token,
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user._id;

  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new AppError(
        "This route is not for password update. Please use /update-password",
        400
      )
    );
  }

  const filteredUser = filterObj(req.body, "name", "email");
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredUser, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    message: "working on it",
    user: updatedUser,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { isActive: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
