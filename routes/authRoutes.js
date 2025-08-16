const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Auth routes
router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);

router.post("/login", authController.login);
router.post("/signup", authController.signup);

router.get("/logout", authController.logout);

module.exports = router;
