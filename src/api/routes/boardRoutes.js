const express = require('express');

const { accessPermissions, validator } = require('../middlewares');
const { boardScheme } = require('../schemes');
const BoardService = require('../../services/BoardService');

const router = express.Router();
const boardService = new BoardService();

router.get(
    '/',
    accessPermissions.forAuthorized,
    async (request, response, next) => {
        try {
            const boards = await boardService.findAll();

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
    accessPermissions.forAuthorized,
    async (request, response, next) => {
        const { params: { boardId } } = request;

        try {
            const foundBoard = await boardService.findById(boardId);

            if (!foundBoard) return next(new Error('Not found'));

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
    accessPermissions.forAdmin,
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
    accessPermissions.forAdmin,
    validator(boardScheme),
    async (request, response, next) => {
        const {
            body,
            params: { boardId }
        } = request;

        try {
            const updatedBoard = await boardService.findByIdAndUpdate(boardId, body);

            if (!updatedBoard) return next(new Error('Not found'));

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
    accessPermissions.forAdmin,
    async (request, response, next) => {
        const { params: { boardId } } = request;

        try {
            const deletedBoard = await boardService.findByIdAndDelete(boardId);

            if (!deletedBoard) return next(new Error('Not found'));

            return response
                .status(204)
                .end();
        } catch (error) {
            return next(error);
        }
    }
);

module.exports = router;
