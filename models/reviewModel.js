const mongoose = require("mongoose");

const Tour = require("./tourModel");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Please provide a review"],
      trim: true,
      minLength: [3, "A review must have 3 or more characters"],
      maxLength: [300, "A review can not be grater then 300 characters"],
    },
    rating: {
      type: Number,
      min: [1, "Rating should be more then or equal 1"],
      max: [5, "Rating can not be more then 5"],
      default: 4,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A review must have an author"],
    },
    tour: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: [true, "A review should belong to a tour"],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "author", select: "name" });

  next();
});

reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const [stats] = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: "$tour",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  await Tour.findByIdAndUpdate(tourId, {
    ratingsQuantity: stats.nRating,
    ratingsAverage: stats.avgRating,
  });
};

reviewSchema.post("save", async function () {
  this.constructor.calcAverageRatings(this.tour);
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
