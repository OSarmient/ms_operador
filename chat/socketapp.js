const httpServer = require("http").createServer();
const recibirMensajeResolver = require("./resolvers/recibirMensajeSocket.js");
const jwtValidate = require("../utilities/jwtValidate.js");

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {

    socket.on("join", ({auth_token, id_operador_asignado})=>{
        try{
            const decoded = jwtValidate(auth_token);
            socket.join(decoded.id_operador_asignado);
        }catch(error){
            socket.emit("error", "No autorizado");
        }
    });

    socket.on("message", ({auth_token, id_chat, mensaje})=>{
        try{
            const decoded = jwtValidate(auth_token);
            socket.join(decoded.id_operador_asignado);
            recibirMensajeResolver({ id_chat, mensaje});
        }catch(error){
            socket.emit("error", "No autorizado");
        }
    });

});


httpServer.listen(8001);
module.exports = io;