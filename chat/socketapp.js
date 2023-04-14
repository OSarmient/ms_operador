const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
      } 
});

io.on("connection", (socket) => {
    console.log("New client connected, id:");
    console.log(socket.id);
});


httpServer.listen(8001);

module.exports = io;