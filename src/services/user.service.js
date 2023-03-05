 const { User } = require('../models');

const getByUserName = async (email) => {
    const data = await User.findOne({ where: { email } });
    return data;
};

const findAll = async () => {
    const data = await User.findAll();
    return data;
};

const create = async (user) => {
    const addUser = await User.create(user);
    return addUser;
};

module.exports = {
    create,
    getByUserName,
    findAll,
};