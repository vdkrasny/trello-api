const CardModel = require('../models/CardModel');

class CardService {
    constructor(cardModel) {
        this.cardModel = cardModel || new CardModel();
    }

    async create({
        name, description, estimate, status, dueDate, labels
    }) {
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
            const createdCard = await this.cardModel.create(newCard);

            return createdCard;
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            const cards = await this.cardModel.findAll();

            return cards;
        } catch (error) {
            throw error;
        }
    }

    async findById(cardId) {
        try {
            const foundCard = await this.cardModel.findById(cardId);

            return foundCard;
        } catch (error) {
            throw error;
        }
    }

    async findByIdAndUpdate(cardId, {
        name, description, estimate, status, dueDate, labels
    }) {
        try {
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
        } catch (error) {
            throw error;
        }
    }

    async findByIdAndDelete(cardId) {
        try {
            const deletedCard = await this.cardModel.findByIdAndDelete(cardId);

            return deletedCard;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CardService;
