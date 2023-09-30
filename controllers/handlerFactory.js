const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

exports.deleteOne = (Model) => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(
        new AppError(`Can't find document with ID:${req.params.id}`, 404)
      );
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });
};

exports.updateOne = (Model, documentName = "data") => {
  return catchAsync(async (req, res, next) => {
    const updatedDoc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!updatedDoc) {
      return next(
        new AppError(`Can't find document with ID:${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        [documentName]: updatedDoc,
      },
    });
  });
};
