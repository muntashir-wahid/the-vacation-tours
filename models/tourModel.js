const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: {
      value: true,
      message: "Tour must have a name",
    },
    unique: [true, "Name should be unique. {VALUE} already exist."],
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "Tour must have a duration"],
    min: [2, "Duration should be more or equal 2. Received {VALUE}"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "Tour must have a group size"],
    min: [2, "Group size should be more or equal 2. Received {VALUE}"],
    max: [30, "Group size should be less or equal 30. Received {VALUE}"],
  },
  difficulty: {
    type: String,
    required: [true, "Tour must have a difficulty"],
  },
  price: {
    type: Number,
    required: [true, "Tour must have a price"],
    min: [200, "Price should be more then 1500. Received {VALUE}"],
  },
  priceDiscount: Number,
  ratingsAverage: {
    type: Number,
    default: 4.0,
    min: [0, "Ratings should be grater then 0, Received {VALUE}"],
    max: [5, "Ratings should be less then or equal 5, Received {VALUE}"],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "Tour must have a summary"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "Tour must have a cover image"],
  },
  images: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;