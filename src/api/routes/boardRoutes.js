const express = require('express');

const validator = require('../middlewares/validator');
const BoardService = require('../../services/BoardService');
const { boardScheme } = require('../schemes');
const accessPermissions = require('../middlewares/accessPermissions');

const router = express.Router();
const boardService = new BoardService();

router.use(accessPermissions.forAuthorized);

router.get(
    '/',
    async (request, response, next) => {
        try {
            const boards = await boardService.findAll();

            return response.json(boards);
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

            if (!foundBoard) return next(new Error('Not found'));

            return response.json(foundBoard);
        } catch (error) {
            return next(error);
        }
    }
);

router.use(accessPermissions.forAdmin);

router.post(
    '/',
    validator(boardScheme),
    async (request, response, next) => {
        const { body } = request;

        try {
            const boards = await boardService.create(body);

            return response.json(boards);
        } catch (error) {
            return next(error);
        }
    }
);

router.put(
    '/:boardId',
    validator(boardScheme),
    async (request, response, next) => {
        const {
            body,
            params: { boardId }
        } = request;

        try {
            const updatedBoard = await boardService.findByIdAndUpdate(boardId, body);

            if (!updatedBoard) return next(new Error('Not found'));

            return response.json(updatedBoard);
        } catch (error) {
            return next(error);
        }
    }
);

router.delete(
    '/:boardId',
    async (request, response, next) => {
        const { params: { boardId } } = request;

        try {
            const deletedBoard = await boardService.findByIdAndDelete(boardId);

            if (!deletedBoard) return next(new Error('Not found'));

            return response.json(deletedBoard);
        } catch (error) {
            return next(error);
        }
    }
);

module.exports = router;
