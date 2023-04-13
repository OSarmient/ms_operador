const { error } = require('console');
const express = require('express');
const router = express.Router();
const readline = require('readline'); //Provicional, para insertar info por consola
const jwt = require('jsonwebtoken');

const secretKey = 'secretKey';

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

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Nombre operador: ', (name) => {
            console.log(`Hola ${name}!`);
            theResponse.data.operador.forEach(operador => {
                if (operador.id_operador_asignado == name) {
                    console.log(`El valor ${name} coincide con el id_operador_asignado ${operador.id_operador_asignado}`);
                    
                    const token = jwt.sign({
                        id_operador_asignado: 'name',
                        exp: Math.floor(Date.now() / 1000) + (60 * 60) // Expira en 1 hora
                    }, secretKey);

                    console.log(token);
                } else {
                    console.log(error);
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