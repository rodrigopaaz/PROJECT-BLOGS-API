const Joi = require('joi');
const userService = require('../user.service');

const isNameValid = Joi.object({
  name: Joi.string().min(8).required(),
});

const isEmailValid = Joi.object({
  quantity: Joi.string().email().required(),
});

const isPasswordValid = Joi.object({
  quantity: Joi.string().min(6).alphanum().required(),
});

const validateUser = async (user) => {
  const getUser = await userService.getAll();
  if (getUser.display_name.includes(user)) {
    return { type: 'ALREADY_REGISTERED', message: 'User already registered' };
  }
};

const validateFields = (sales) => {
   const { name, email, password } = sales;
    const { error: err1 } = isNameValid.validate({ name });
  if (err1) return { type: 'INVALID_VALUE', message: err1.message };
    const { error: err2 } = isEmailValid.validate({ email });
  if (err2) return { type: 'INVALID_VALUE', message: err2.message };
  const { error: err3 } = isPasswordValid.validate({ password });
  if (err3) return { type: 'INVALID_VALUE', message: err3.message };// 400
};

module.exports = {
  validateFields,
  validateUser,
};