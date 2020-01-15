import NotFoundError from '../errors/NotFoundError';
import { CardModel, Card } from '../models/CardModel';

export class CardService {
    private cardModel: CardModel;

    constructor(container) {
        this.cardModel = container.get('cardModel');
    }

    public async create({ name, description, estimate, status, dueDate, labels }: Card): Promise<Card> {
        const createdCard = await this.cardModel.create({
            name,
            description,
            estimate,
            status,
            dueDate,
            labels,
        });

        return createdCard;
    }

    public async getAll(): Promise<Card[]> {
        const cards = await this.cardModel.getAll();

        return cards;
    }

    public async getById(cardId: string): Promise<Card> {
        const foundCard = await this.cardModel.findById(cardId);

        if (!foundCard) {
            throw new NotFoundError('The requested Card was not found');
        }

        return foundCard;
    }

    public async updateById(
        cardId: string,
        { name, description, estimate, status, dueDate, labels }: Card
    ): Promise<Card> {
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

    public async deleteById(cardId: string): Promise<Card> {
        const deletedCard = await this.cardModel.findByIdAndDelete(cardId);

        if (!deletedCard) {
            throw new NotFoundError('The requested Card was not found');
        }

        return deletedCard;
    }
}

export default CardService;
