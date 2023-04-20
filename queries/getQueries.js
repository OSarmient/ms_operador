// Función que retorna la query para obtener usuarios
const getUsuariosQuery = ({ id, documento_usuario, offset, limit }) => `
  query {
    usuario(
      id: ${id || null},
      documento_usuario: ${documento_usuario || null},
      offset: ${offset || null},
      limit: ${limit || null}
    ) {
      id_tipo_de_documento
      id_usuario_temporal
      numero_de_documento
      primer_nombre
      segundo_nombre
      primer_apellido
      segundo_apellido
      telefono
      correo
    }
  }
`;

// Función que retorna la query para obtener operadores
const getOperadoresQuery = ({ userid, offset, limit }) => `
  query {
    operador(
      userid: ${userid ? `"${userid}"` : null},
      offset: ${offset || null},
      limit: ${limit || null}
    ) {
      id
      id_operador_asignado
      crp_contrasena
      auth_token
    }
  }
`;

// Función que retorna la query para obtener chats
const getChatsQuery = ({ id_chat, id_usuario, id_operador, documento_usuario, offset, limit, limit_mensajes, offset_mensajes, con_operador }) => `
  query {
    chat(
      id_chat: ${id_chat || null},
      id_usuario: ${id_usuario || null},
      id_operador: ${id_operador || null},
      documento_usuario: ${documento_usuario ? `"${documento_usuario}"` : null},
      offset: ${offset || null},
      limit: ${limit || null},
      limit_mensajes: ${limit_mensajes || null},
      offset_mensajes: ${offset_mensajes || null}
      con_operador: ${con_operador}
    ) {
      id_chat
      Mensajes {
        id
        id_chat
        texto_mensaje
        de_operador
        hora_mensaje
      }
      Usuarios {
        id_tipo_de_documento
        id_usuario_temporal
        numero_de_documento
        primer_nombre
        segundo_nombre
        primer_apellido
        segundo_apellido
        telefono
        correo
      }
      Operadores {
        id
        id_operador_asignado
      }
      motivo_sesion {
        id_motivo_sesion
        nombre_motivo
      }
      tiempo_inicio
      tiempo_finalizado
    }
  }
`;

// Función que retorna la query para obtener motivos
const getMotivosQuery = ({ id_motivo }) => `
  query {
    motivos(
        id_motivo: ${id_motivo}
    ) {
      id_motivo_sesion
      nombre_motivo
    }
  }
`;

// Función que retorna la query para obtener tipos de documento
const getTiposDeDocumentoQuery = ({ id_tipo_documento }) => `
  query {
    tiposdeDocumento(
        id_tipo_documento: ${id_tipo_documento}
    ) {
      id_tipo_de_documento
      nombre_tipo_de_documento
    }
  }
`;


module.exports = { getUsuariosQuery, getOperadoresQuery, getChatsQuery, getMotivosQuery, getTiposDeDocumentoQuery }