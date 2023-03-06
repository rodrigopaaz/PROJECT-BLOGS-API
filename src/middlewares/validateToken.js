const { verifyToken } = require('../auth/jwtToken');

const validateToken = (req, res, next) => {
    try {
        const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json(
            { message: 'Token not found' },
        );
    }
    const payload = verifyToken(authorization);
    req.data = payload.data;
    next();
} catch (error) {
        res.status(401).json({
            message: 'Expired or invalid token',
        });
    }
};
module.exports = validateToken;