const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'secretKey';

module.exports = (id_operador_asignado) => {
    return jwt.sign({
        id_operador_asignado: id_operador_asignado,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // Expira en 1 dia
    }, secretKey);
};
