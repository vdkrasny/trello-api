const express = require('express');
const { Container } = require('typedi');

const middlewares = require('../middlewares');
const schemes = require('../schemes');
const CardModel = require('../../models/CardModel');
const CardService = require('../../services/CardService');
const CardController = require('../../controllers/CardController');

Container.set('cardModel', new CardModel());
Container.set('cardService', new CardService(Container));
Container.set('cardController', new CardController(Container));

const cardController = Container.get('cardController');
const router = express.Router();

router.get(
    '/',
    middlewares.requestCover(cardController.getAll)
);

router.get(
    '/:cardId',
    middlewares.requestCover(cardController.getById)
);

router.post(
    '/',
    middlewares.bodyValidator(schemes.cardScheme),
    middlewares.requestCover(cardController.create)
);

router.put(
    '/:cardId',
    middlewares.bodyValidator(schemes.cardScheme),
    middlewares.requestCover(cardController.updateById)
);

router.delete(
    '/:cardId',
    middlewares.requestCover(cardController.deleteById)
);

module.exports = router;
