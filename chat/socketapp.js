const httpServer = require("http").createServer();
const recibirMensajeResolver = require("./resolvers/enviarMensajeSocket.js");
const jwtValidate = require("../utilities/jwtValidate.js");

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.use((socket, next) => {
    try {
        const decoded = jwtValidate(socket.request.headers.auth_token);
        socket.join(decoded.id_operador_asignado);
        socket.decoded = decoded;
        next();
    } catch (error) {
        socket.emit("error", "No autorizado");
        next(new Error("invalid"));
    }
});

io.on("connection", (socket) => {

    socket.on("message", async ({ id_chat, mensaje }) => {
        var respuestaEnvio = await recibirMensajeResolver({ id_chat, mensaje });
        io.to(socket.id).emit("notification", {respuestaEnvio:respuestaEnvio, id_chat: id_chat});
    });

});


httpServer.listen(process.env.SOCKET_PORT || 8001);
module.exports = io;