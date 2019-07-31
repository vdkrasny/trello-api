const express = require('express');

const { validator, verifyAccess } = require('../middlewares');
const { boardScheme } = require('../schemes');
const BoardService = require('../../services/BoardService');
const StatusError = require('../../helpers/StatusError');

const router = express.Router();
const boardService = new BoardService();

router.get(
    '/',
    async (request, response, next) => {
        try {
            const boards = await boardService.getAll();

            return response
                .status(200)
                .json(boards);
        } catch (error) {
            return next(error);
        }
    }
);

router.get(
    '/:boardId',
    async (request, response, next) => {
        const { params: { boardId } } = request;

        try {
            const foundBoard = await boardService.findById(boardId);

            if (!foundBoard) {
                throw new StatusError(404, 'Not Found');
            }

            return response
                .status(200)
                .json(foundBoard);
        } catch (error) {
            return next(error);
        }
    }
);

router.post(
    '/',
    verifyAccess,
    validator(boardScheme),
    async (request, response, next) => {
        const { body } = request;

        try {
            const boards = await boardService.create(body);

            return response
                .status(201)
                .json(boards);
        } catch (error) {
            return next(error);
        }
    }
);

router.put(
    '/:boardId',
    verifyAccess,
    validator(boardScheme),
    async (request, response, next) => {
        const {
            body,
            params: { boardId }
        } = request;

        try {
            const updatedBoard = await boardService.findByIdAndUpdate(boardId, body);

            if (!updatedBoard) {
                throw new StatusError(404, 'Not Found');
            }

            return response
                .status(204)
                .end();
        } catch (error) {
            return next(error);
        }
    }
);

router.delete(
    '/:boardId',
    verifyAccess,
    async (request, response, next) => {
        const { params: { boardId } } = request;

        try {
            const deletedBoard = await boardService.findByIdAndDelete(boardId);

            if (!deletedBoard) {
                throw new StatusError(404, 'Not Found');
            }

            return response
                .status(204)
                .end();
        } catch (error) {
            return next(error);
        }
    }
);

module.exports = router;
