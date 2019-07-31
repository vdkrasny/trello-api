const CardModel = require('../models/CardModel');

class CardService {
    constructor(cardModel) {
        this.cardModel = cardModel || new CardModel();
    }

    async create({
        name, description, estimate, status, dueDate, labels
    }) {
        const newCard = {
            name,
            description,
            createdAt: new Date(),
            estimate,
            status,
            dueDate,
            labels
        };
        const createdCard = await this.cardModel.create(newCard);

        return createdCard;
    }

    async findAll() {
        const cards = await this.cardModel.findAll();

        return cards;
    }

    async findById(cardId) {
        const foundCard = await this.cardModel.findById(cardId);

        return foundCard;
    }

    async findByIdAndUpdate(cardId, {
        name, description, estimate, status, dueDate, labels
    }) {
        const updatedCard = await this.cardModel.findByIdAndUpdate(
            cardId,
            {
                name,
                description,
                estimate,
                status,
                dueDate,
                labels
            }
        );

        return updatedCard;
    }

    async findByIdAndDelete(cardId) {
        const deletedCard = await this.cardModel.findByIdAndDelete(cardId);

        return deletedCard;
    }
}

module.exports = CardService;
