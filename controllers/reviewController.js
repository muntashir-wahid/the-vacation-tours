const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require("./handlerFactory");
const Review = require("../models/reviewModel");

exports.setTourAndUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.author) req.body.author = req.user._id;
  next();
};

exports.setTourId = (req, res, next) => {
  if (req.params.tourId) req.query.tour = req.params.tourId;

  next();
};

exports.createReview = createOne(Review, "review");
exports.getAllReviews = getAll(Review, "reviews", "review");
exports.getReview = getOne(Review, "review");
exports.updateReview = updateOne(Review, "review");
exports.deleteReview = deleteOne(Review);
