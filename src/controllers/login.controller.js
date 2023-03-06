require('dotenv/config');
const token = require('../utils/jwtToken');

const { userService } = require('../services');

const isBodyvalid = (username, password) => username && password;

module.exports = async (req, res) => {
    try {
 const { email, password } = req.body;
        if (!isBodyvalid(email, password)) {
 return res.status(400).json({ message: 'Some required fields are missing',
            });
        } const user = await userService.getByUserName(email);
        if (!user || user.password !== password) {
          return res.status(400).json({ message: 'Invalid fields' }); 
        } 
        const createToken = token(user);
        res.status(200).json({ token: createToken });
    } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
      } 
};
