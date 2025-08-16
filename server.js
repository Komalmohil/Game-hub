<<<<<<< HEAD
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");
const http = require("http");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");

app.use("/", authRoutes); 
app.use("/", gameRoutes);   


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

const mongoUri = "mongodb://127.0.0.1:27017/wordcounter";
const server = http.createServer(app);
const initSocket = require("./sockets/ticTacToe");
initSocket(server);

mongoose.connect(mongoUri)
    .then(() => {
        console.log("MongoDB connected");
        server.listen(3000, () => console.log("Server running on http://localhost:3000"));
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });
=======
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");
const http = require("http");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.set("view engine", "ejs");

app.use("/", authRoutes); 
app.use("/", gameRoutes);   


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

const mongoUri = "mongodb://127.0.0.1:27017/wordcounter";
const server = http.createServer(app);
const initSocket = require("./sockets/ticTacToe");
initSocket(server);

mongoose.connect(mongoUri)
    .then(() => {
        console.log("MongoDB connected");
        server.listen(3000, () => console.log("Server running on http://localhost:3000"));
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    });
>>>>>>> 5143003f9ef8ac5d47fd4591f9ba3f2a0191d7c5
