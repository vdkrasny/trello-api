const StatusError = require('../helpers/StatusError');
const CardService = require('../services/CardService');

const cardService = new CardService();

class CardController {
    static async getAll(request, response) {
        const cards = await cardService.getAll();

        return response
            .status(200)
            .json(cards);
    }

    static async getById(request, response) {
        const { params: { cardId } } = request;

        const foundCard = await cardService.getById(cardId);

        if (!foundCard) {
            throw new StatusError(404, 'Not Found');
        }

        return response
            .status(200)
            .json(foundCard);
    }

    static async create(request, response) {
        const { body } = request;

        const createdCard = await cardService.create(body);

        return response
            .status(201)
            .json(createdCard);
    }

    static async updateById(request, response) {
        const {
            body,
            params: { cardId }
        } = request;

        const updatedCard = await cardService.updateById(cardId, body);

        if (!updatedCard) {
            throw new StatusError(404, 'Not Found');
        }

        return response
            .status(204)
            .end();
    }

    static async deleteById(request, response) {
        const { params: { cardId } } = request;

        const deletedCard = await cardService.deleteById(cardId);

        if (!deletedCard) {
            throw new StatusError(404, 'Not Found');
        }

        return response
            .status(204)
            .end();
    }
}

module.exports = CardController;
