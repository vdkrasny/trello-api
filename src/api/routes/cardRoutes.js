const express = require('express');

const { accessPermissions, validator } = require('../middlewares');
const { cardScheme } = require('../schemes');
const CardService = require('../../services/CardService');

const router = express.Router();
const cardService = new CardService();

router.get(
    '/',
    accessPermissions.forAuthorized,
    async (request, response, next) => {
        try {
            const cards = await cardService.findAll();

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
    accessPermissions.forAuthorized,
    async (request, response, next) => {
        const { params: { cardId } } = request;

        try {
            const foundCard = await cardService.findById(cardId);

            if (!foundCard) return next(new Error('Not found'));

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
    accessPermissions.forAuthorized,
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
    accessPermissions.forAuthorized,
    validator(cardScheme),
    async (request, response, next) => {
        const {
            body,
            params: { cardId }
        } = request;

        try {
            const updatedCard = await cardService.findByIdAndUpdate(cardId, body);

            if (!updatedCard) return next(new Error('Not found'));

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
    accessPermissions.forAuthorized,
    async (request, response, next) => {
        const { params: { cardId } } = request;

        try {
            const deletedCard = await cardService.findByIdAndDelete(cardId);

            if (!deletedCard) return next(new Error('Not found'));

            return response
                .status(204)
                .end();
        } catch (error) {
            return next(error);
        }
    }
);

module.exports = router;
