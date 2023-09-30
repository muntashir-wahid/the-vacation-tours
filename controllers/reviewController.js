const catchAsync = require("../utils/catchAsync");
const { deleteOne, updateOne, createOne, getOne } = require("./handlerFactory");
const Review = require("../models/reviewModel");

exports.setTourAndUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.author) req.body.author = req.user._id;
  next();
};

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tourId) filter = { tour: req.params.tourId };

  const reviews = await Review.find(filter);

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = createOne(Review, "review");
exports.getReview = getOne(Review, "review");
exports.updateReview = updateOne(Review, "review");
exports.deleteReview = deleteOne(Review);
