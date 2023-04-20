const httpServer = require("http").createServer();
const recibirMensajeResolver = require("./resolvers/enviarMensajeSocket.js");
const jwtValidate = require("../utilities/jwtValidate.js");

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {

    socket.on("join", ({ auth_token }) => {
        try {
            const decoded = jwtValidate(auth_token);
            socket.join(decoded.id_operador_asignado);
        } catch (error) {
            socket.emit("error", "No autorizado");
        }
    });

    socket.on("message", ({ auth_token, id_chat, mensaje }) => {
        try {
            const decoded = jwtValidate(auth_token);
            socket.join(decoded.id_operador_asignado);
            recibirMensajeResolver({ id_chat, mensaje });
        } catch (error) {
            socket.emit("error", "No autorizado");
        }
    });

});


httpServer.listen(process.env.SOCKET_PORT || 8001);
module.exports = io;