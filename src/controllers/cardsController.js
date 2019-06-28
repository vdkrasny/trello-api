const cardModel = require('../models/Card');

class CardsController {
    async create(request, response, next) {
        const {
            body: {
                name, description, estimate, status, dueDate, labels
            }
        } = request;

        try {
            const newCard = {
                name,
                description,
                createdAt: new Date(),
                estimate,
                status,
                dueDate,
                labels
            };
            const cards = await cardModel.create(newCard);

            return response.json(cards);
        } catch (error) {
            return next(error);
        }
    }

    async findAll(request, response, next) {
        try {
            const cards = await cardModel.getCollection();

            return response.json(cards);
        } catch (error) {
            return next(error);
        }
    }

    async findById(request, response, next) {
        const { params: { cardId } } = request;

        try {
            const foundCard = await cardModel.findById(cardId);

            if (!foundCard) {
                throw new Error('Not found');
            }

            return response.json(foundCard);
        } catch (error) {
            return next(error);
        }
    }

    async findByIdAndUpdate(request, response, next) {
        const {
            body,
            params: { cardId }
        } = request;

        try {
            const updatedCard = await cardModel.findByIdAndUpdate(cardId, body);

            if (!updatedCard) {
                throw new Error('Not found');
            }

            return response.json(updatedCard);
        } catch (error) {
            return next(error);
        }
    }

    async findByIdAndDelete(request, response, next) {
        const { params: { cardId } } = request;

        try {
            const deletedCard = await cardModel.findByIdAndDelete(cardId);

            if (!deletedCard) {
                throw new Error('Not found');
            }

            return response.json(deletedCard);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new CardsController();
