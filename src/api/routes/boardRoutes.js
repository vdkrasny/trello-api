const express = require('express');
const { Container } = require('typedi');

const middlewares = require('../middlewares');
const schemes = require('../schemes');
const BoardModel = require('../../models/BoardModel');
const BoardService = require('../../services/BoardService');
const BoardController = require('../../controllers/BoardController');

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

module.exports = router;
