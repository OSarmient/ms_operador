const express = require('express');
const router = express.Router();
var {getChatsQuery} = require("../queries/getQueries.js");
var fetchUtilitie = require("../utilities/fetchUtilitie.js");

/* GET home page. */
router.post('/', async (req,res,next) => {
    const {offset, limit, limit_mensajes, offset_mensajes} = req.body;
    const con_operador = false;
    const query = getChatsQuery({offset, limit, limit_mensajes, offset_mensajes, con_operador});
    const response = await fetchUtilitie(query);
    res.send(response);
});

module.exports = router;