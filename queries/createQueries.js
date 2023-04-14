const crearMensaje = ({ id_chat, texto_mensaje, hora_mensaje, de_operador }) =>
  `mutation{
        crearMensaje(id_chat:${id_chat},texto_mensaje:"""${texto_mensaje}""", hora_mensaje:"${hora_mensaje}",de_operador:${de_operador}) {
        id
        id_chat 
      }
    }`;



module.exports = { crearMensaje };