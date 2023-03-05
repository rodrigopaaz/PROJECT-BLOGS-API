const userService = require('../services');

const createUser = async (user) => {
    const addUser = await userService(user);
    return addUser;
};

module.exports = {
    createUser,
};