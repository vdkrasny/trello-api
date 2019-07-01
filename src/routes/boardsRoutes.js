const express = require('express');
const { accessPermissions } = require('../middlewares');
const { boardsController } = require('../controllers');

const router = express.Router();

router.use(accessPermissions.forAuthorized);
router.get('/', boardsController.findAll);
router.get('/:boardId', boardsController.findById);

router.use(accessPermissions.forAdmin);
router.post('/', boardsController.create);
router.put('/:boardId', boardsController.findByIdAndUpdate);
router.delete('/:boardId', boardsController.findByIdAndDelete);

module.exports = router;
