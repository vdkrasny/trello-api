import { Router } from 'express';
import { Container } from 'typedi';

import middlewares from '../middlewares';
import schemes from '../schemes';
import { BoardController } from '../../controllers/BoardController';

const boardController = Container.get(BoardController);
const router = Router();

router.get('/', middlewares.requestCover(boardController.getAll));

router.get('/:boardId', middlewares.requestCover(boardController.getById));

router.post(
    '/',
    middlewares.checkAuthorization,
    middlewares.checkBodyValidation(schemes.boardScheme),
    middlewares.requestCover(boardController.create)
);

router.put(
    '/:boardId',
    middlewares.checkAuthorization,
    middlewares.checkBodyValidation(schemes.boardScheme),
    middlewares.requestCover(boardController.updateById)
);

router.delete('/:boardId', middlewares.checkAuthorization, middlewares.requestCover(boardController.deleteById));

export default router;
