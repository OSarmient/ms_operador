const jwtValidate = require('./jwtValidate.js');

module.exports = (req, res, next) => {
    const auth_token = req.body['auth_token'];
    if (auth_token) {
        try {
            const decoded = jwtValidate(auth_token);
            req.decoded = decoded;
            next();
        } catch (error) {
            res.status(401).send({ error: 'No autorizado' });
        }
    } else {
        res.status(401).send({ error: 'No autorizado' });
    }
}