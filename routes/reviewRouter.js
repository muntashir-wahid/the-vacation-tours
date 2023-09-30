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

router.use(protect);

router
  .route("/")
  .get(setTourId, getAllReviews)
  .post(restrictTo("user"), setTourAndUserIds, createReview);

router
  .route("/:id")
  .get(getReview)
  .patch(restrictTo("user", "admin"), updateReview)
  .delete(restrictTo("user", "admin"), deleteReview);

module.exports = router;
