<<<<<<< HEAD
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email:{ type: String, required: true, unique: true },
    password: { type: String, required: true } 
});

module.exports = mongoose.model("User", userSchema);
=======
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email:{ type: String, required: true, unique: true },
    password: { type: String, required: true } 
});

module.exports = mongoose.model("User", userSchema);
>>>>>>> 5143003f9ef8ac5d47fd4591f9ba3f2a0191d7c5
