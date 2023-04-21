const express = require('express');
const router = express.Router();
const io = require('../chat/socketapp.js');

//Envío de mensaje a operador por socket

/* GET home page. */
router.post('/', function (req, res, next) {
    const { id_chat, texto_mensaje, hora_mensaje, id_operador_asignado } = req.body;
    if(id_operador_asignado){
        io.to(id_operador_asignado).emit('message', { id_chat, texto_mensaje, hora_mensaje });
    }
    res.send({ ms: "Mensaje enviado"});
});

module.exports = router;