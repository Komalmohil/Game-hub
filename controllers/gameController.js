exports.getHome = (req, res) => {
    res.render("home", { user: req.user });
};

exports.getTypingTest = (req, res) => {
    res.render("typingTest", {
        user: req.user,
        game: "Typing Test",
        onLeaderboard: false
    });
};

exports.getTicTacToe = (req, res) => {
    res.render("ticTacToeHome", { user: req.user });
};
