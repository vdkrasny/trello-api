import { RequestHandler, Request, Response } from 'express';
import { Service, Inject } from 'typedi';

import { HttpStatus } from '../enums/HttpStatus';
import { CardService } from '../services/CardService';

@Service()
export class CardController {
    @Inject()
    private _cardService!: CardService;

    public getAll: RequestHandler = async (_: Request, response: Response): Promise<Response> => {
        const cards = await this._cardService.getAll();

        return response.status(HttpStatus.OK).json(cards);
    };

    public getById: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
        const {
            params: { cardId },
        } = request;

        const foundCard = await this._cardService.getById(cardId);

        return response.status(HttpStatus.OK).json(foundCard);
    };

    public create: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
        const { body } = request;

        const createdCard = await this._cardService.create(body);

        return response.status(HttpStatus.Created).json(createdCard);
    };

    public updateById: RequestHandler = async (request: Request, response: Response): Promise<void> => {
        const {
            body,
            params: { cardId },
        } = request;

        await this._cardService.updateById(cardId, body);

        return response.status(HttpStatus.NoContent).end();
    };

    public deleteById: RequestHandler = async (request: Request, response: Response): Promise<void> => {
        const {
            params: { cardId },
        } = request;

        await this._cardService.deleteById(cardId);

        return response.status(HttpStatus.NoContent).end();
    };
}

export default CardController;
