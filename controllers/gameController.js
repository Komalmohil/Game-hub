const TypingResult = require("../models/TypingResult");

exports.getHome = (req, res) => {
    res.render("home", { user: req.user });
};

exports.getTypingTest = (req, res) => {
    res.render("typingTest", {
        user: req.user,
        game: "Typing Test"
    });
};

exports.getTicTacToe = (req, res) => {
    res.render("ticTacToeHome", { user: req.user });
};

exports.getMemoryMatch = (req, res) => {
    res.render("memoryMatch", { user: req.user });
};


