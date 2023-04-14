const express = require('express');
const router = express.Router();
const readline = require('readline'); //Provicional, para insertar info por consola
const graphqlFetch = require('../utilities/fetchUtilitie.js');
const {getOperadoresQuery} = require('../queries/getQueries.js');
const matchPassword = require('../utilities/matchPassword.js');

router.get('/', async (req, res, next) => {
    try{
        const theResponse = await graphqlFetch(getOperadoresQuery({ limit: 10}));

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Nombre operador: ', async (name) => {
            console.log(`Hola ${name}!`);
            theResponse.data.operador.forEach( async (operador) => {
                if (operador.id_operador_asignado === name) {
                    console.log(`El valor ${name} coincide con el id_operador_asignado ${operador.id_operador_asignado}`);
                    
                    const password = await new Promise((resolve, reject) => {
                        rl.question('Contrasena: ', (contrasena) => {
                            resolve(contrasena);
                        });
                    });

                    matchPassword(password, operador.crp_contrasena, name);

                    rl.close();
                }
            });
        });

        

        res.send(theResponse.data.operador)

    } catch (error) {
        console.log(error);
    }
    
    //res.send(theResponse.data.operador)
});


module.exports = router;