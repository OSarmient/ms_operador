const fetchGraphql = require("../../utilities/fetchUtilitie.js");
const { crearMensaje } = require("../../queries/createQueries.js");
const dataFormat = require("../../utilities/dataFormatter.js");

module.exports =
    async ({id_chat,mensaje}) => {
        const fecha = dataFormat(new Date());

        var msg = {
            id_chat: id_chat,             //Se debe cambiar por el id del chat
            texto_mensaje: mensaje,
            hora_mensaje: fecha,    //Se usa la gecha del servidor
            de_operador: true   
        }

        var resultquery = await fetchGraphql(crearMensaje(msg));
        return resultquery?.errors ? resultquery.errors[0] : {message: "Mensaje enviado"};
    };
    