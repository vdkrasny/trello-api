import { Router } from 'express';
import { Container } from 'typedi';

import middlewares from '../middlewares';
import schemes from '../schemes';
import { CardController } from '../../controllers/CardController';

const cardController = Container.get(CardController);
const router = Router();

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
