<<<<<<< HEAD
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

=======
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

>>>>>>> 5143003f9ef8ac5d47fd4591f9ba3f2a0191d7c5
