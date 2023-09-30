const express = require("express");

const {
  createReview,
  deleteReview,
  getAllReviews,
  getReview,
  setTourId,
  setTourAndUserIds,
  updateReview,
} = require("./../controllers/reviewController");
const { protect, restrictTo } = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(setTourId, getAllReviews)
  .post(protect, restrictTo("user"), setTourAndUserIds, createReview);

router.route("/:id").get(getReview).patch(updateReview).delete(deleteReview);

module.exports = router;
