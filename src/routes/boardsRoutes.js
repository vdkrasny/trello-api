const express = require('express');
const { authController, boardsController } = require('../controllers');

const router = express.Router();

router.use(authController.isAuth);
router.get('/', boardsController.findAll);
router.get('/:boardId', boardsController.findById);
router.post('/', authController.isAdmin, boardsController.create);
router.put('/:boardId', authController.isAdmin, boardsController.findByIdAndUpdate);
router.delete('/:boardId', authController.isAdmin, boardsController.findByIdAndDelete);

module.exports = router;
