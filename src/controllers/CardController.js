class CardController {
    constructor(container) {
        this.cardService = container.get('cardService');
    }

    getAll = async (_, response) => {
        const cards = await this.cardService.getAll();

        return response.status(200).json(cards);
    };

    getById = async (request, response) => {
        const {
            params: { cardId },
        } = request;

        const foundCard = await this.cardService.getById(cardId);

        return response.status(200).json(foundCard);
    };

    create = async (request, response) => {
        const { body } = request;

        const createdCard = await this.cardService.create(body);

        return response.status(201).json(createdCard);
    };

    updateById = async (request, response) => {
        const {
            body,
            params: { cardId },
        } = request;

        await this.cardService.updateById(cardId, body);

        return response.status(204).end();
    };

    deleteById = async (request, response) => {
        const {
            params: { cardId },
        } = request;

        await this.cardService.deleteById(cardId);

        return response.status(204).end();
    };
}

export default CardController;
