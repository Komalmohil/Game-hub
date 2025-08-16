const TypingResult = require("../models/TypingResult");

exports.postTypingTest = async (req, res) => {
    const { totalWords, typeWords, correctWords, incorrectWords } = req.body;
    const game = "typing-test";
    try {
        const newResult = await TypingResult.create({
            username: req.user.username,  
            game:game,                         
            totalWords,
            typeWords,
            correctWords,
            incorrectWords
        });

        res.json({ message: "Result saved", result: newResult });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getLeaderboard = async (req, res) => {
    try {
        const game = req.params.game;
        const username = req.user.username;

        const topResults = await TypingResult.aggregate([
            { $match: { game } },
            { $group: {
                _id: "$username",
                totalWords: { $sum: "$totalWords" },
                typeWords: { $sum: "$typeWords" },
                correctWords: { $sum: "$correctWords" },
                incorrectWords: { $sum: "$incorrectWords" },
                lastPlayed: { $max: "$date" }
            }},
            { $sort: { totalWords: -1, correctWords: -1 } },
            { $limit: 10 }
        ]);

        const userResults = await TypingResult.find({ username, game }).sort({ date: -1 });

        res.render("typingLb", {
            game,
            currentUser: username,
            topResults,
            userResults,
             onLeaderboard: true
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};
