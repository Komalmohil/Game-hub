<<<<<<< HEAD
const mongoose = require("mongoose");

const typingResultSchema = new mongoose.Schema({
  username: { type: String, required: true },
  totalWords: { type: Number, required: true },
   game: { type: String, default:"typing-test"  },
  typeWords:{ type: Number, required: true },
  correctWords: { type: Number, required: true },
  incorrectWords: { type: Number, required: true },
  date: { type: Date, default: Date.now }
  
});

const TypingResult = mongoose.model("TypingResult", typingResultSchema);

module.exports = TypingResult;
=======
const mongoose = require("mongoose");

const typingResultSchema = new mongoose.Schema({
  username: { type: String, required: true },
  totalWords: { type: Number, required: true },
   game: { type: String, default:"typing-test"  },
  typeWords:{ type: Number, required: true },
  correctWords: { type: Number, required: true },
  incorrectWords: { type: Number, required: true },
  date: { type: Date, default: Date.now }
  
});

const TypingResult = mongoose.model("TypingResult", typingResultSchema);

module.exports = TypingResult;
>>>>>>> 5143003f9ef8ac5d47fd4591f9ba3f2a0191d7c5
