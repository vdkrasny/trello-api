const express = require('express');

const middlewares = require('../middlewares');
const schemes = require('../schemes');
const CardController = require('../../controllers/CardController');

const router = express.Router();

router.get(
    '/',
    middlewares.requestCover(CardController.getAll)
);

router.get(
    '/:cardId',
    middlewares.requestCover(CardController.getById)
);

router.post(
    '/',
    middlewares.validator(schemes.cardScheme),
    middlewares.requestCover(CardController.create)
);

router.put(
    '/:cardId',
    middlewares.validator(schemes.cardScheme),
    middlewares.requestCover(CardController.updateById)
);

router.delete(
    '/:cardId',
    middlewares.requestCover(CardController.deleteById)
);

module.exports = router;
