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

router.get("/me", protect, getMe, getUser);
router.patch("/update-password", protect, updatePassword);
router.patch("/update-me", protect, updateMe);
router.delete("/delete-me", protect, deleteMe);

router.route("/").get(protect, restrictTo("admin"), getAllUsers);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
