const express = require("express");

const {
  forgotPassword,
  login,
  protect,
  resetPassword,
  restrictTo,
  signup,
} = require("./../controllers/authController");
const { getAllUsers } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

router.route("/").get(protect, restrictTo("admin"), getAllUsers);

module.exports = router;
