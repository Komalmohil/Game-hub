const mongoose = require("mongoose");

const typingResultSchema = new mongoose.Schema({
  username: { type: String, required: true },
  totalWords: { type: Number, required: true },
   game: { 
    type: String, 
    required: true, 
    enum: ["typing-test", "tic-tac-toe", "memory-match"] 
  },
  typeWords:{ type: Number, required: true },
  correctWords: { type: Number, required: true },
  incorrectWords: { type: Number, required: true },
  date: { type: Date, default: Date.now }
  
});

// Rename model here
const TypingResult = mongoose.model("TypingResult", typingResultSchema);

module.exports = TypingResult;
