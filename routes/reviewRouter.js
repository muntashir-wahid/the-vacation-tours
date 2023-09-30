const express = require("express");

const {
  createReview,
  deleteReview,
  getAllReviews,
  setTourAndUserIds,
  updateReview,
} = require("./../controllers/reviewController");
const { protect, restrictTo } = require("./../controllers/authController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllReviews)
  .post(protect, restrictTo("user"), setTourAndUserIds, createReview);

router.route("/:id").delete(deleteReview).patch(updateReview);

module.exports = router;
