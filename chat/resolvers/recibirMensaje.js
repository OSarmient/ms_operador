const fetchGraphql = require("../../utilities/fetchUtilitie.js");
const { crearMensaje } = require("../../queries/createQueries.js");
const dataFormat = require("../../utilities/dataFormatter.js");

module.exports =
    async ({id_chat,mensaje}) => {
        const fecha = dataFormat(new Date());

        var msg = {
            id_chat: id_chat,             //Se debe cambiar por el id del chat
            texto_mensaje: mensaje,
            hora_mensaje: fecha,
            de_operador: true   
        }

        var resultquery = await fetchGraphql(crearMensaje(msg));
        console.log(crearMensaje(msg));
        console.log(resultquery);
    };
    