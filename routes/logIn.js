const express = require('express');
const router = express.Router();
const graphqlFetch = require('../utilities/fetchUtilitie.js');
const {getOperadoresQuery} = require('../queries/getQueries.js');
const matchPassword = require('../utilities/matchPassword.js');

router.post('/', async (req, res, next) => {
    
    try {
        const theResponse = await graphqlFetch(getOperadoresQuery({ limit: 10 }));
        const { username, password } = req.body;
        let userFound = false;

        theResponse.data.operador.forEach(async (operador) => {
            if (operador.id_operador_asignado === username) {
            userFound = true;
            const isPasswordValid = await matchPassword(password, operador.crp_contrasena, username);

            if (isPasswordValid) {
                res.status(200).json({ auth_token: operador.auth_token});
            } else {
                res.status(401).json({ message: 'Contraseña incorrecta.' });
            }
            }
        });

        if (!userFound) {
            res.status(404).json({ message: 'Usuario no encontrado.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
    
});


module.exports = router;