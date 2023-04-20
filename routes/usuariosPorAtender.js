const express = require('express');
const router = express.Router();
var {getChatsQuery} = require("../queries/getQueries.js");
var fetchUtilitie = require("../utilities/fetchUtilitie.js");

/* GET home page. */
router.post('/', async (req,res,next) => {
    const query = getChatsQuery(req.body);
    const response = await fetchUtilitie(query);
    res.send(response);
});

module.exports = router;