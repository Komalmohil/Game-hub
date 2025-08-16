const express = require("express");
const authMiddleware = require("../middleware/auth");
const gameController = require("../controllers/gameController");
const typingController = require("../controllers/typingController");

const router = express.Router();

// Protect all routes
router.use(authMiddleware);

router.get("/", gameController.getHome);
router.get("/typing-test", gameController.getTypingTest);
router.get("/tic-tac-toe", gameController.getTicTacToe);
router.get("/memory-match", gameController.getMemoryMatch);


router.post("/typing-test", authMiddleware, typingController.postTypingTest);
router.get("/leaderboard/:game", authMiddleware, typingController.getLeaderboard);

module.exports = router;
