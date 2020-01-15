import express from 'express';
import { Container } from 'typedi';

import middlewares from '../middlewares';
import schemes from '../schemes';
import { BoardModel } from '../../models/BoardModel';
import { BoardService } from '../../services/BoardService';
import BoardController from '../../controllers/BoardController';

Container.set('boardModel', new BoardModel());
Container.set('boardService', new BoardService(Container));
Container.set('boardController', new BoardController(Container));

const boardController = Container.get('boardController');
const router = express.Router();

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
