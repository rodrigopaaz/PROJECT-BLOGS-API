const { userService } = require('../services');
const errorMap = require('../utils/errorMap');
const token = require('../utils/jwtToken');

const createUser = async (req, res) => {
    const data = req.body;
    const dataService = await userService.create(data);
    if (dataService.type) { 
    return res.status(errorMap.mapError(dataService.type)).json({ message: dataService.message });
    }
    const user = await userService.getByUserName(data.email);
    const createToken = token(user);
    return res.status(201).json({ token: createToken });
};

module.exports = {
    createUser,
};