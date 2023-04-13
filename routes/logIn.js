const express = require('express');
const  { graphqlHTTP }  = require('express-graphql');
const { buildSchema } = require('graphql');
const bcrypt = require('bcrypt');

const router = express.Router();

const schema = buildSchema(`
    type Operador {
        login(nombre_usuario: String!, contrasena: String!): String
    }
`);

const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        query: `query Operador{
            Operador{
                id
                id_operador_asignado
            }
        }
    `
    }),
});

const root = {
    login: async ({ nombre_usuario, contrasena }) => {

        const operador = await Operador.findOne({ nombre_usuario: nombre_usuario });

        if (!operador) {
            throw new Error('Usuario no encontrado');
        }

        if (await bcrypt.compare(contrasena, operador.contrasena)) {
            return 'Bienvenido, ${operador.nombre_usuario}';
        }else{
            throw new Error('Usuario no encontrado');
        }
    }
};

router.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

module.exports = router;