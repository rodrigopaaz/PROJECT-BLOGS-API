const { userService } = require('../services');
const errorMap = require('../utils/errorMap');
const { createToken, verifyToken } = require('../utils/jwtToken');

const createUser = async (req, res) => {
    const data = req.body;
    const dataService = await userService.create(data);
    if (dataService.type) { 
    return res.status(errorMap.mapError(dataService.type)).json({ message: dataService.message });
    }
    const user = await userService.getByUserName(data.email);
    const token = createToken(user);
    return res.status(201).json({ token });
};

const findAll = async (req, res) => {
    try {       
        const { authorization } = req.headers;
        if (!authorization) {
 return res.status(401).json(
            { message: 'Token not found' },
        ); 
}
        const checkToken = verifyToken(authorization);
        if (checkToken) {
        const users = await userService.findAll();
        return res.status(200)
        .json(users); 
        }
    } catch (error) {
        return res.status(401)
    .json({ message: 'Expired or invalid token' }); 
    }
};

module.exports = {
    createUser,
    findAll,
};