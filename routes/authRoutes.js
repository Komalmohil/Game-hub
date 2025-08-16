<<<<<<< HEAD
const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);

router.post("/login", authController.login);
router.post("/signup", authController.signup);

router.get("/logout", authController.logout);

module.exports = router;
=======
const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);

router.post("/login", authController.login);
router.post("/signup", authController.signup);

router.get("/logout", authController.logout);

module.exports = router;
>>>>>>> 5143003f9ef8ac5d47fd4591f9ba3f2a0191d7c5
