const express = require('express');
const router = express.Router();
const io = require('../chat/socketapp.js');

//Envío de mensaje a operador por socket

/* GET home page. */
router.post('/', function (req, res, next) {
    const { id_operador_asignado } = req.body;
    io.to(id_operador_asignado).emit('error', req.body);
    res.send({});
});

module.exports = router;