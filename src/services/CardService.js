import NotFoundError from '../errors/NotFoundError';

class CardService {
    constructor(container) {
        this.cardModel = container.get('cardModel');
    }

    async create({ name, description, estimate, status, dueDate, labels }) {
        const newCard = {
            name,
            description,
            estimate,
            status,
            dueDate,
            labels,
        };
        const createdCard = await this.cardModel.create(newCard);

        return createdCard;
    }

    async getAll() {
        const cards = await this.cardModel.getAll();

        return cards;
    }

    async getById(cardId) {
        const foundCard = await this.cardModel.findById(cardId);

        if (!foundCard) {
            throw new NotFoundError('The requested Card was not found');
        }

        return foundCard;
    }

    async updateById(cardId, { name, description, estimate, status, dueDate, labels }) {
        const updatedCard = await this.cardModel.findByIdAndUpdate(cardId, {
            name,
            description,
            estimate,
            status,
            dueDate,
            labels,
        });

        if (!updatedCard) {
            throw new NotFoundError('The requested Card was not found');
        }

        return updatedCard;
    }

    async deleteById(cardId) {
        const deletedCard = await this.cardModel.findByIdAndDelete(cardId);

        if (!deletedCard) {
            throw new NotFoundError('The requested Card was not found');
        }

        return deletedCard;
    }
}

export default CardService;
