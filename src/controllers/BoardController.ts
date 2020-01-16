import { Request, Response } from 'express';

import { BoardService } from '../services/BoardService';

export class BoardController {
    private _boardService: BoardService;

    constructor(container) {
        this._boardService = container.get('boardService');
    }

    public getAll = async (_: Request, response: Response): Promise<Response> => {
        const boards = await this._boardService.getAll();

        return response.status(200).json(boards);
    };

    public getById = async (request: Request, response: Response): Promise<Response> => {
        const {
            params: { boardId },
        } = request;

        const foundBoard = await this._boardService.getById(boardId);

        return response.status(200).json(foundBoard);
    };

    public create = async (request: Request, response: Response): Promise<Response> => {
        const { body } = request;

        const createdBoard = await this._boardService.create(body);

        return response.status(201).json(createdBoard);
    };

    public updateById = async (request: Request, response: Response): Promise<void> => {
        const {
            body,
            params: { boardId },
        } = request;

        await this._boardService.updateById(boardId, body);

        return response.status(204).end();
    };

    public deleteById = async (request: Request, response: Response): Promise<void> => {
        const {
            params: { boardId },
        } = request;

        await this._boardService.deleteById(boardId);

        return response.status(204).end();
    };
}

export default BoardController;
