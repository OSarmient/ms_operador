const express = require('express');
const router = express.Router();

router.get('/', 
async function (req, res, next) {
    try{
        const response = await fetch('http://168.176.84.62:3000/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `query{
                    operador(limit:10) {
                        id
                        id_operador_asignado
                        __typename
                    }
                }
            `
            }),
        });

        theResponse = await response.json();

        console.log(theResponse.data.operador);

    } catch (error) {
        console.log(error);
    }
    


    res.send(theResponse.data.operador)
});

module.exports = router;