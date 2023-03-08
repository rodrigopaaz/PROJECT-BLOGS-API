 const { User } = require('../models');
 const { schemas } = require('./validations');

 const noPassword = { attributes: { exclude: ['password'] } };

const getByUserName = async (email) => {
    const data = await User.findOne({ where: { email } });
    return data;
};

const findAll = async () => {
    const data = await User.findAll(noPassword);
    return data;
};

const findById = async (id) => {
    const data = await User.findByPk(id, noPassword);
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

const remove = async (id) => {
    const removeUser = await User.destroy({ where: { id } });
    return removeUser;
};

module.exports = {
    create,
    getByUserName,
    findAll,
    findById,
    remove,
};