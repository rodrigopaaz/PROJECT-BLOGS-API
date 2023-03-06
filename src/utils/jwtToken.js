const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'segredao';

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
}; 

    const createToken = (user) => jwt.sign({ data: { userId: user.id } },
        secret,
        jwtConfig);

    const verifyToken = (token) => jwt.verify(token, secret);    
module.exports = { createToken, verifyToken };