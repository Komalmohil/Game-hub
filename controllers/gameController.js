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
    res.render("ticTacToe", { user: req.user,game: "Tic Tac Toe" });
};

exports.getMemoryMatch = (req, res) => {
    res.render("memoryMatch", { user: req.user });
};


exports.getLeaderboard = async (req, res) => {
    const currentUserId = req.user?._id;

    try {
     
        const allResults = await TypingResult.find()
            .populate("user", "username")
            .sort({ words: -1 })  
            .limit(10);         

        const userResults = allResults.filter(r => r.user._id.toString() === currentUserId.toString());

        res.render("leaderboard", { user: req.user, allResults, userResults });
    } catch (err) {
        console.error("Leaderboard error:", err);
        res.status(500).send("Server error");
    }
};
