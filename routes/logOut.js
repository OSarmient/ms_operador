const express = require('express');
const router = express.Router();
const graphqlFetch = require('../utilities/fetchUtilitie.js');
const {removerAutenticacion} = require('../queries/createQueries.js');

router.post("/", async (req, res, next)=> {
    try{
        const response = await graphqlFetch(removerAutenticacion(req.decoded.id_operador_asignado));
        res.status(200).json({message: "bye " + response.data.removerAutenticacion.id_operador_asignado});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error interno del servidor.", error: error});
    }
});

module.exports = router;