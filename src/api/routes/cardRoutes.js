import express from 'express';
import { Container } from 'typedi';

import middlewares from '../middlewares';
import schemes from '../schemes';
import { CardModel } from '../../models/CardModel';
import CardService from '../../services/CardService';
import CardController from '../../controllers/CardController';

Container.set('cardModel', new CardModel());
Container.set('cardService', new CardService(Container));
Container.set('cardController', new CardController(Container));

const cardController = Container.get('cardController');
const router = express.Router();

router.get('/', middlewares.requestCover(cardController.getAll));

router.get('/:cardId', middlewares.requestCover(cardController.getById));

router.post('/', middlewares.checkBodyValidation(schemes.cardScheme), middlewares.requestCover(cardController.create));

router.put(
    '/:cardId',
    middlewares.checkBodyValidation(schemes.cardScheme),
    middlewares.requestCover(cardController.updateById)
);

router.delete('/:cardId', middlewares.requestCover(cardController.deleteById));

export default router;
