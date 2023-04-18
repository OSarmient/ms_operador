const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY || 'secretKey';

module.exports = (auth_token) => {
    return jwt.verify(auth_token, secretKey);
}