const Joi = require('joi');
const { User } = require('../../models');

const isNameValid = Joi.object({
  displayName: Joi.string().min(8).required(),
});

const isEmailValid = Joi.object({
  email: Joi.string().email().required(),
});

const isPasswordValid = Joi.object({
  password: Joi.string().min(6).alphanum().required(),
});

const validateUser = async (email) => {
  const data = await User.findOne({ where: { email } });
  if (data) {
    return { type: 'CONFLICT', message: 'User already registered' };
  }
};

const validateFields = (data) => {
   const { displayName, email, password } = data;
    const { error: err1 } = isNameValid.validate({ displayName });
  if (err1) return { type: 'BAD_REQUEST', message: err1.message };
    const { error: err2 } = isEmailValid.validate({ email });
  if (err2) return { type: 'BAD_REQUEST', message: err2.message };
  const { error: err3 } = isPasswordValid.validate({ password });
  if (err3) return { type: 'BAD_REQUEST', message: err3.message };// 400
};

module.exports = {
  validateFields,
  validateUser,
};