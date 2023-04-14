const bcrypt = require('bcrypt');
const singkey = require('../utilities/jwtSings.js');

module.exports = async (password_front, password_bd, name) => {
    const match = await bcrypt.compare(password_front, password_bd);

    if (match) {
        const token = singkey(name);
        console.log("La contraseña coincide");
        console.log({ token: token, usuario: name });
    }else{
        console.log('Contraseña incorrecta');
    }
};
