const NotFoundError = require('../errors/NotFoundError');

class CardController {
    constructor(container) {
        this.cardService = container.get('cardService');

        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.updateById = this.updateById.bind(this);
        this.deleteById = this.deleteById.bind(this);
    }

    async getAll(request, response) {
        const cards = await this.cardService.getAll();

        return response
            .status(200)
            .json(cards);
    }

    async getById(request, response) {
        const { params: { cardId } } = request;

        const foundCard = await this.cardService.getById(cardId);

        if (!foundCard) {
            throw new NotFoundError('The requested Card was not found');
        }

        return response
            .status(200)
            .json(foundCard);
    }

    async create(request, response) {
        const { body } = request;

        const createdCard = await this.cardService.create(body);

        return response
            .status(201)
            .json(createdCard);
    }

    async updateById(request, response) {
        const {
            body,
            params: { cardId }
        } = request;

        const updatedCard = await this.cardService.updateById(cardId, body);

        if (!updatedCard) {
            throw new NotFoundError('The requested Card was not found');
        }

        return response
            .status(204)
            .end();
    }

    async deleteById(request, response) {
        const { params: { cardId } } = request;

        const deletedCard = await this.cardService.deleteById(cardId);

        if (!deletedCard) {
            throw new NotFoundError('The requested Card was not found');
        }

        return response
            .status(204)
            .end();
    }
}

module.exports = CardController;
