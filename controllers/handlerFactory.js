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

exports.createOne = (Model, documentName = "data") => {
  return catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        [documentName]: doc,
      },
    });
  });
};

exports.getOne = (Model, documentName = "data", populateOptions) => {
  return catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);

    const doc = await query;

    if (!doc) {
      return next(
        new AppError(`Can't find document with ID:${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        [documentName]: doc,
      },
    });
  });
};
