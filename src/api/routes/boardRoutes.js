const express = require('express');

const middlewares = require('../middlewares');
const schemes = require('../schemes');
const BoardController = require('../../controllers/BoardController');

const router = express.Router();

router.get(
    '/',
    middlewares.requestCover(BoardController.getAll)
);

router.get(
    '/:boardId',
    middlewares.requestCover(BoardController.getById)
);

router.post(
    '/',
    middlewares.verifyAccess,
    middlewares.validator(schemes.boardScheme),
    middlewares.requestCover(BoardController.create)
);

router.put(
    '/:boardId',
    middlewares.verifyAccess,
    middlewares.validator(schemes.boardScheme),
    middlewares.requestCover(BoardController.updateById)
);

router.delete(
    '/:boardId',
    middlewares.verifyAccess,
    middlewares.requestCover(BoardController.deleteById)
);

module.exports = router;
