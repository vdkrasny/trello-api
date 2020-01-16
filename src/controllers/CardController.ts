import { Request, Response } from 'express';

import { CardService } from '../services/CardService';

export class CardController {
    private cardService: CardService;

    constructor(container) {
        this.cardService = container.get('cardService');
    }

    public getAll = async (_: Request, response: Response): Promise<Response> => {
        const cards = await this.cardService.getAll();

        return response.status(200).json(cards);
    };

    public getById = async (request: Request, response: Response): Promise<Response> => {
        const {
            params: { cardId },
        } = request;

        const foundCard = await this.cardService.getById(cardId);

        return response.status(200).json(foundCard);
    };

    public create = async (request: Request, response: Response): Promise<Response> => {
        const { body } = request;

        const createdCard = await this.cardService.create(body);

        return response.status(201).json(createdCard);
    };

    public updateById = async (request: Request, response: Response): Promise<void> => {
        const {
            body,
            params: { cardId },
        } = request;

        await this.cardService.updateById(cardId, body);

        return response.status(204).end();
    };

    public deleteById = async (request: Request, response: Response): Promise<void> => {
        const {
            params: { cardId },
        } = request;

        await this.cardService.deleteById(cardId);

        return response.status(204).end();
    };
}

export default CardController;
