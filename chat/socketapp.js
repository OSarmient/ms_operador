const httpServer = require("http").createServer();
const recibirMensajeResolver = require("./resolvers/recibirMensaje.js");

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    socket.on("message", recibirMensajeResolver);
});


httpServer.listen(8001);
module.exports = io;