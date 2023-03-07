const { Category } = require('../models');
const { schemas } = require('./validations');

/* const getByUserName = async (email) => {
   const data = await Category.findOne({ where: { email } });
   return data;
}; */

const findAll = async () => {
   const data = await Category.findAll();
   return data;
};

/* const findById = async (id) => {
   const data = await Category.findByPk(id);
   return data;
}; */
 
const create = async (data) => {
   const checkUser = schemas.validateCategory(data);
   if (checkUser) return checkUser;
   const addCategory = await Category.create({ name: data.name });
   return addCategory;
};

module.exports = {
   create,
   findAll,
};