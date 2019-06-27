const express = require('express');
const { boardsController } = require('../controllers');

const router = express.Router();

router.get('/', boardsController.findAll);
router.get('/:boardId', boardsController.findById);
router.post('/', boardsController.create);
router.put('/:boardId', boardsController.findByIdAndUpdate);
router.delete('/:boardId', boardsController.findByIdAndDelete);

module.exports = router;
