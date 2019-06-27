const Cards = require('../models/Cards');

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
            const cards = await Cards.create(newCard);

            return response.json(cards);
        } catch (error) {
            return next(error);
        }
    }

    async findAll(request, response, next) {
        try {
            const cards = await Cards.getCollection();

            return response.json(cards);
        } catch (error) {
            return next(error);
        }
    }

    async findById(request, response, next) {
        const { params: { cardId } } = request;

        try {
            const foundCard = await Cards.findById(cardId);

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
            const updatedCard = await Cards.findByIdAndUpdate(cardId, body);

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
            const deletedCard = await Cards.findByIdAndDelete(cardId);

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
