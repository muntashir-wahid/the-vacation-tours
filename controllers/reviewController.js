const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");
const Review = require("../models/reviewModel");

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.author) req.body.author = req.user._id;

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Working on it",
    data: {
      review: newReview,
    },
  });
});

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Review.find(), req.query)
    .filter()
    .limitFields()
    .sort()
    .paginate()
    .search();

  // Execute the query
  const reviews = await features.query;

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});