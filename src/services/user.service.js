 const { User } = require('../models');
 const { schemas } = require('./validations');

const getByUserName = async (email) => {
    const data = await User.findOne({ where: { email } });
    return data;
};

const findAll = async () => {
    const data = await User.findAll();
    return data;
};

const create = async (data) => {
    const { displayName, email, password } = data;
    const checkUser = await schemas.validateUser(email);
    if (checkUser) return checkUser;
    const checkFields = schemas.validateFields(data);
    if (checkFields) return checkFields;
    const addUser = await User.create({ displayName, email, password });
    return addUser;
};

module.exports = {
    create,
    getByUserName,
    findAll,
};