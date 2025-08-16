module.exports = function(server) {
  const { Server } = require("socket.io");
  const io = new Server(server);

  let onlineUsers = {}; 
  let games = {}; 

  io.on("connection", (socket) => {

    socket.on("joinLobby", (username) => {
      socket.username = username;
      onlineUsers[socket.id] = username;
      io.emit("updateUsers", onlineUsers);
    });

    socket.on("challenge", (targetSocketId) => {
      const roomId = `${socket.id}-${targetSocketId}`;
      socket.join(roomId);
      io.to(targetSocketId).socketsJoin(roomId);

      const players = {};
      players[socket.id] = "X";
      players[targetSocketId] = "O";

      games[roomId] = { board: Array(9).fill(""), turn: "X", players };

      socket.emit("assignSymbol", "X");
      io.to(targetSocketId).emit("assignSymbol", "O");

      io.to(roomId).emit("startGame", { roomId, players: players });
    });

    socket.on("makeMove", ({ roomId, idx }) => {
      const game = games[roomId];
      if(!game) return;

      if(game.players[socket.id] !== game.turn) return;

      game.board[idx] = game.turn;

      io.to(roomId).emit("boardUpdate", { idx, symbol: game.turn });

      const winner = checkWinner(game.board);
      if(winner) {
        io.to(roomId).emit("gameOver", { winner });
        delete games[roomId];
        return;
      }

      if(!game.board.includes("")) {
        io.to(roomId).emit("gameOver", { winner: "draw" });
        delete games[roomId];
        return;
      }

      game.turn = game.turn === "X" ? "O" : "X";
      io.to(roomId).emit("updateTurn", game.turn);
    });

    socket.on("disconnect", () => {
      delete onlineUsers[socket.id];
      io.emit("updateUsers", onlineUsers);
    });
  });

  function checkWinner(board) {
    const winCombos = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for(const [a,b,c] of winCombos){
      if(board[a] && board[a] === board[b] && board[a] === board[c]){
        return board[a]; 
      }
    }
    return null;
  }
};
