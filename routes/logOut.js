const express = require('express');
const router = express.Router();
const graphqlFetch = require('../utilities/fetchUtilitie.js');
const {removerAutenticacion} = require('../queries/createQueries.js');

router.post("/", async (req, res, next)=> {
    const response = await graphqlFetch(removerAutenticacion(req.decoded.id_operador_asignado));
    console.log(response);
    res.status(200).json({message: "Sesión cerrada correctamente."});
});

module.exports = router;