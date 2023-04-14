const httpServer = require("http").createServer();
const recibirMensajeResolver = require("./resolvers/recibirMensaje.js");

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("New client connected");
    console.log(socket.id);
    socket.on("message", recibirMensajeResolver);
});


httpServer.listen(8001);
module.exports = io;