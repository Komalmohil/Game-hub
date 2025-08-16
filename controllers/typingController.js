const TypingResult = require("../models/TypingResult");

exports.postTypingTest = async (req, res) => {
    const { totalWords, typeWords, correctWords, incorrectWords } = req.body;
    const game = "typing-test";
    try {
        const newResult = await TypingResult.create({
            username: req.user.username,  // save current user
            game:game,                         // save game name
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


// exports.getLeaderboard = async (req, res) => {
//     try {
//         const game = req.params.game;          // e.g., "typing-test"
//         const username = req.user.username;

//         // Get all results of current user for this game
//         const userResults = await TypingResult.find({ username, game }).sort({ date: -1 });

//         // Get top 10 results across all users for this game (ranked by correctWords)
//         const topResults = await TypingResult.find({ game })
//             .sort({ correctWords: -1, totalWords: -1 })  // rank by correctWords first, then totalWords
//             .limit(10);

//         res.render("leaderboard", {
//             currentUser: username,
//             userResults,   // all results of current user
//             topResults,    // top 10 results across all users
//             game
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Server error");
//     }
// };
exports.getLeaderboard = async (req, res) => {
    try {
        const game = req.params.game;  // e.g., "Typing Test"
        const currentUser = req.user.username;

        // Aggregate results by username
        const leaderboard = await TypingResult.aggregate([
            { $match: { game } },
            { 
                $group: {
                    _id: "$username",
                    totalWords: { $sum: "$totalWords" },
                    typedWords: { $sum: "$typeWords" },
                    correctWords: { $sum: "$correctWords" },
                    incorrectWords: { $sum: "$incorrectWords" },
                    lastPlayed: { $max: "$date" }
                }
            },
            { $sort: { correctWords: -1, totalWords: -1 } }, // Rank by correct words first
            { $limit: 10 }
        ]);

       const userResults = await TypingResult.find({ username: currentUser, game })
                                      .sort({ date: -1 });

res.render("typingLb", {
    topResults: leaderboard,
    currentUser,
     onLeaderboard: true,
    game,
    userResults
});

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
};
