const express = require('express');
const router = express.Router();
const graphqlFetch = require('../utilities/fetchUtilitie.js');
const { getOperadoresQuery } = require('../queries/getQueries.js');
const matchPassword = require('../utilities/matchPassword.js');

router.post('/', async (req, res, next) => {

    try {
        const { username, password } = req.body;
        const theResponse = await graphqlFetch(getOperadoresQuery({ limit: 10, userid: username }));
    
        if (theResponse.errors || theResponse.data.operador.length === 0) {
            res.status(401).json({ message: 'Contraseña incorrecta.' });
        } else {
            const isPasswordValid = await matchPassword(password, theResponse.data.operador[0].crp_contrasena, username);
            if (!isPasswordValid) { res.status(401).json({ message: 'Contraseña incorrecta.' }); return; };
            res.status(200).json({ auth_token: isPasswordValid });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }

});


module.exports = router;