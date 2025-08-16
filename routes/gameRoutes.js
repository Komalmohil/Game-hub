const express = require("express");
const authMiddleware = require("../middleware/auth");
const gameController = require("../controllers/gameController");
const typingController = require("../controllers/typingController");
const ticTacToeController = require("../controllers/ticTacToeController");

const router = express.Router();

router.use(authMiddleware);
router.get("/", gameController.getHome);
router.get("/typing-test", gameController.getTypingTest);
router.get("/tic-tac-toe", gameController.getTicTacToe); 
router.get("/memory-match", gameController.getMemoryMatch);

router.post("/typing-test", typingController.postTypingTest);
router.get("/leaderboard/:game", typingController.getLeaderboard);

router.get("/tic-tac-toe/computer", ticTacToeController.playComputer); 
router.get("/tic-tac-toe/online", ticTacToeController.playOnline);     
router.get("/tic-tac-toe/self", ticTacToeController.playSelf);


module.exports = router;
