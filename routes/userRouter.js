const express = require("express");

const {
  deleteMe,
  forgotPassword,
  getMe,
  login,
  protect,
  resetPassword,
  restrictTo,
  signup,
  updateMe,
  updatePassword,
} = require("./../controllers/authController");
const {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} = require("./../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

// Protect all routes after this middleware
router.use(protect);

router.get("/me", getMe, getUser);
router.patch("/update-password", updatePassword);
router.patch("/update-me", updateMe);
router.delete("/delete-me", deleteMe);

// All the actions after this middleware can be performed by admin
router.use(restrictTo("admin"));

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
