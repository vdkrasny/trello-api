import { Inject } from 'typedi';

import { Card } from '../types/Card';
import { CardModel } from '../models/CardModel';
import { NotFoundException } from '../exceptions/NotFoundException';

export class CardService {
    @Inject()
    private _cardModel!: CardModel;

    public async create({ name, description, estimate, status, dueDate, labels }: Card): Promise<Card> {
        const createdCard = await this._cardModel.create({
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
        const cards = await this._cardModel.getAll();

        return cards;
    }

    public async getById(cardId: string): Promise<Card> {
        const foundCard = await this._cardModel.findById(cardId);

        if (!foundCard) {
            throw new NotFoundException('The requested Card was not found');
        }

        return foundCard;
    }

    public async updateById(
        cardId: string,
        { name, description, estimate, status, dueDate, labels }: Card
    ): Promise<Card> {
        const updatedCard = await this._cardModel.findByIdAndUpdate(cardId, {
            name,
            description,
            estimate,
            status,
            dueDate,
            labels,
        });

        if (!updatedCard) {
            throw new NotFoundException('The requested Card was not found');
        }

        return updatedCard;
    }

    public async deleteById(cardId: string): Promise<Card> {
        const deletedCard = await this._cardModel.findByIdAndDelete(cardId);

        if (!deletedCard) {
            throw new NotFoundException('The requested Card was not found');
        }

        return deletedCard;
    }
}

export default CardService;
