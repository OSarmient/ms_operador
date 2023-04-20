const bcrypt = require('bcrypt');
const singkey = require('../utilities/jwtSings.js');
const {request, gql} = require('graphql-request');

module.exports = async (password_front, password_bd, name) => {
    const match = await bcrypt.compare(password_front, password_bd);

    if (match) {
        const token = singkey(name);
        console.log("La contraseña coincide");
        //console.log({ token: token, usuario: name });

        const mutation = gql`
            mutation($id_operador: String!, $token: String!) {
                darAutenticacion(id_operador_asignado: $id_operador,auth_token: $token) {
                    id
                    id_operador_asignado
                    crp_contrasena
                    auth_token
                    __typename
                }
            }
        `;

        const variables = {id_operador: name, token: token};
        try{
            const response = await request("http://localhost:3000/", mutation, variables);
            //console.log('Respuesta de la mutación:', response);
        }catch(error) {
            console.error('Error al realizar la solicitud de mutación:', error);
        }
        return token;
    }else{
        console.log('Contraseña incorrecta');
        return null;
    }
    return match;
};
