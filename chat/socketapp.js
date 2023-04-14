const httpServer = require("http").createServer();
const fetchGraphql = require("../utilities/fetchUtilitie.js");

const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("New client connected");
    console.log(socket.id);
    const d = new Date();
    let text = d.toString(); // problem here

    console.log(text);

    socket.on("message", async (data) => {
        console.log(data);
        var msg = {
            id_chat: 1,
            texto_mensaje: data,
            hora_mensaje: text,
            de_operador: false
        }

        var resultquery = await fetchGraphql(
            `
            mutation{
                crearMensaje(id_chat:1,texto_mensaje:"${data}", hora_mensaje:"${text}",de_operador:false) {
                id
                id_chat 
              }
            }`
        );
        console.log(resultquery);
    });


});


httpServer.listen(8001);

module.exports = io;