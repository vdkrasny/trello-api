const express = require('express');

const { validator } = require('../middlewares');
const { cardScheme } = require('../schemes');
const CardService = require('../../services/CardService');
const StatusError = require('../../helpers/StatusError');

const router = express.Router();
const cardService = new CardService();

router.get(
    '/',
    async (request, response, next) => {
        try {
            const cards = await cardService.getAll();

            return response
                .status(200)
                .json(cards);
        } catch (error) {
            return next(error);
        }
    }
);

router.get(
    '/:cardId',
    async (request, response, next) => {
        const { params: { cardId } } = request;

        try {
            const foundCard = await cardService.findById(cardId);

            if (!foundCard) {
                throw new StatusError(404, 'Not Found');
            }

            return response
                .status(200)
                .json(foundCard);
        } catch (error) {
            return next(error);
        }
    }
);

router.post(
    '/',
    validator(cardScheme),
    async (request, response, next) => {
        const { body } = request;

        try {
            const cards = await cardService.create(body);

            return response
                .status(201)
                .json(cards);
        } catch (error) {
            return next(error);
        }
    }
);

router.put(
    '/:cardId',
    validator(cardScheme),
    async (request, response, next) => {
        const {
            body,
            params: { cardId }
        } = request;

        try {
            const updatedCard = await cardService.findByIdAndUpdate(cardId, body);

            if (!updatedCard) {
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
    '/:cardId',
    async (request, response, next) => {
        const { params: { cardId } } = request;

        try {
            const deletedCard = await cardService.findByIdAndDelete(cardId);

            if (!deletedCard) {
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
