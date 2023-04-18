const express = require('express');
const router = express.Router();
const graphqlFetch = require('../utilities/fetchUtilitie.js');
const {removerAutenticacion} = require('../queries/createQueries.js');

router.post("/", async (req, res, next)=> {
    await graphqlFetch(removerAutenticacion(req.body.username));
});

module.exports = router;