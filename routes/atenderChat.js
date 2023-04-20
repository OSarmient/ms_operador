const express = require('express');
const router = express.Router();
var {asignarOperador} = require("../queries/createQueries.js");
var fetchUtilitie = require("../utilities/fetchUtilitie.js");

/* GET home page. */
router.post('/', async (req,res,next) => {
    const {id_chat, id_operador_asignado} = req.body;

    if (!id_chat || !id_operador_asignado) {
        res.status(401).send({error: "Faltan datos"});
    }

    const query = asignarOperador(id_chat, id_operador_asignado); 
    const response = await fetchUtilitie(query);
    if(response?.errors){
        res.status(401).send({error: response.errors});
    }else{
        res.send(response);
    }
});

module.exports = router;