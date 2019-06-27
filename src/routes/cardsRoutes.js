const express = require('express');
const { authController, cardsController } = require('../controllers');

const router = express.Router();

router.use(authController.isAuth);
router.get('/', cardsController.findAll);
router.get('/:cardId', cardsController.findById);
router.post('/', cardsController.create);
router.put('/:cardId', cardsController.findByIdAndUpdate);
router.delete('/:cardId', cardsController.findByIdAndDelete);

module.exports = router;
