const express = require("express");

const {
  forgotPassword,
  login,
  protect,
  resetPassword,
  restrictTo,
  signup,
  updateMe,
  updatePassword,
} = require("./../controllers/authController");
const { getAllUsers } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

router.patch("/update-password", protect, updatePassword);
router.patch("/update-me", protect, updateMe);

router.route("/").get(protect, restrictTo("admin"), getAllUsers);

module.exports = router;
