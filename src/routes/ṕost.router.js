const express = require('express');
const { postController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');
const { validateId, validateFields } = require('../middlewares/validatePost');

const router = express.Router();

router.post(
  '/', validateToken, validateId, validateFields,
  postController.create,
);

  router.get(
  '/', validateToken,
  postController.findAll,
);

router.get(
  '/:id', validateToken,
  postController.findById,
);

router.put(
  '/:id', validateToken,
  postController.update,
);

router.delete(
  '/:id', validateToken,
  postController.remove,
);

module.exports = router;