const express = require('express');
const router = express.Router();
const readline = require('readline'); //Provicional, para insertar info por consola
const singkey = require('../utilities/jwtSings.js');
const graphqlFetch = require('../utilities/fetchUtilitie.js');
const {getOperadoresQuery} = require('../queries/getQueries.js');


router.get('/', async (req, res, next) => {
    try{
        const theResponse = await graphqlFetch(getOperadoresQuery({ limit: 10}));

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Nombre operador: ', (name) => {
            console.log(`Hola ${name}!`);
            theResponse.data.operador.forEach(operador => {
                if (operador.id_operador_asignado == name) {
                    console.log(`El valor ${name} coincide con el id_operador_asignado ${operador.id_operador_asignado}`);
                    const token = singkey(name);
                    console.log({token: token, usuario: name});
                }
            });
            rl.close();
        });

        res.send(theResponse.data.operador)

    } catch (error) {
        console.log(error);
    }
    
    //res.send(theResponse.data.operador)
});


module.exports = router;