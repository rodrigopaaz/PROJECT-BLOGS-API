const express = require('express');
const { categoryController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.post(
  '/', validateToken,
  categoryController.createCategory,
);

/* router.get(
  '/',
  userController.findAll,
);

router.get(
  '/:id',
  userController.findById,
); */

module.exports = router;