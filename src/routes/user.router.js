const express = require('express');
const { userController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post(
  '/',
  userController.createUser,
);

router.get(
  '/',
  userController.findAll,
);

router.get(
  '/:id',
  userController.findById,
);

router.delete(
  '/me', validateToken,
  userController.remove,
);

module.exports = router;