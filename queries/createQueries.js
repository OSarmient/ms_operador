const crearMensaje = ({ id_chat, texto_mensaje, hora_mensaje, de_operador }) =>
  `mutation{
        crearMensaje(id_chat:${id_chat},texto_mensaje:"""${texto_mensaje}""", hora_mensaje:"${hora_mensaje}",de_operador:${de_operador}) {
        id
        id_chat 
      }
    }`;

// Función para crear un usuario
const crearUsuario = (tipo_documento, numero_documento, primer_nombre, primer_apellido, correo, segundo_nombre = null, segundo_apellido = null, telefono = null) => `
mutation {
  crearUsuario(
    tipo_documento: ${tipo_documento},
    numero_documento: ${numero_documento},
    primer_nombre: "${primer_nombre}",
    segundo_nombre: "${segundo_nombre}",
    primer_apellido: "${primer_apellido}",
    segundo_apellido: "${segundo_apellido}",
    telefono: ${telefono},
    correo: "${correo}"
  ) {
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

// Función para crear un chat
const crearChat = (id_usuario, usuario_operador, id_motivo, tiempo_inicio) => `
mutation {
  crearChat(
    id_usuario: ${id_usuario},
    usuario_operador: "${usuario_operador}",
    id_motivo: ${id_motivo},
    tiempo_inicio: "${tiempo_inicio}"
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
      crp_contrasena
      auth_token
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

// Función para cerrar un chat
const cerrarChat = (id_chat, tiempo_fin) => `
mutation {
  cerrarChat(id_chat: ${id_chat}, tiempo_fin: "${tiempo_fin}") {
    id_chat
    Mensajes {
      id
      id_chat
      texto_mensaje
      de_operador
      hora_mensaje
    }
    Usuarios {
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
      crp_contrasena
      auth_token
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

// Función para crear un operador
const crearOperador = (nombre_usuario, contrasena) => `
mutation {
  crearOperador(nombre_usuario: "${nombre_usuario}", contrasena: "${contrasena}") {
    id
    nombre_usuario
    crp_contrasena
    auth_token
  }
}
`;

// Función para crear un tipo de documento
const crearTipodeDocumento = (nombre_tipo) => `
mutation {
  crearTipodeDocumento(nombre_tipo: "${nombre_tipo}") {
    id_tipo_de_documento
    nombre_tipo_de_documento
  }
}
`;

// Función para crear un motivo de sesión
const crearMotivoSesion = (nombre_motivo) => `
mutation {
  crearMotivoSesion(nombre_motivo: "${nombre_motivo}") {
    id_motivo_sesion
    nombre_motivo
  }
}
`;

// Funcion para asignar un operador a un chat
const asignarOperador = (id_chat, id_operador_asignado) => `
mutation {
  asignarOperador(id_chat: ${id_chat}, id_operador_asignado: "${id_operador_asignado}") {
    id_chat
    Mensajes {
      id
      id_chat
      texto_mensaje
      de_operador
      hora_mensaje
    }
    Usuarios {
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
      crp_contrasena
      auth_token
    }
    motivo_sesion {
      id_motivo_sesion
      nombre_motivo
    }
    tiempo_inicio
    tiempo_finalizado
  }
}`;
    

// Función para dar autenticación
const darAutenticacion = (id_operador_asignado, auth_token) => `
  mutation { 
    darAutenticacion( id_operador_asignado: "${id_operador_asignado}", auth_token: "${auth_token}" ) { 
      id nombre_usuario 
      crp_contrasena auth_token 
    } 
  }`;

  // Función para remover autenticación
const removerAutenticacion = (id_operador_asignado) => `
  mutation { 
    removerAutenticacion( id_operador_asignado: "${id_operador_asignado}" ) { 
      id 
      id_operador_asignado 
      crp_contrasena 
      auth_token 
    } 
  }`;

module.exports = { asignarOperador, crearMensaje, crearUsuario, crearChat, cerrarChat, crearOperador, crearTipodeDocumento, crearMotivoSesion, darAutenticacion, removerAutenticacion };