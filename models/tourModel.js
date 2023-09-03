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
  price: {
    type: Number,
    required: [true, "Tour must have a price"],
    min: [1500, "Price should be more then 1500. Received {VALUE}"],
  },
  rating: {
    type: Number,
    default: 4.0,
    min: [0, "Ratings should be grater then 0, Received {VALUE}"],
    max: [5, "Ratings should be less then or equal 5, Received {VALUE}"],
  },
});

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
