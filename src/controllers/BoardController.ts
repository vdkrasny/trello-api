import { RequestHandler, Request, Response } from 'express';
import { Service, Inject } from 'typedi';

import { HttpStatus } from '../enums/HttpStatus';
import { BoardService } from '../services/BoardService';

@Service()
export class BoardController {
    @Inject()
    private _boardService!: BoardService;

    public getAll: RequestHandler = async (_: Request, response: Response): Promise<Response> => {
        const boards = await this._boardService.getAll();

        return response.status(HttpStatus.OK).json(boards);
    };

    public getById: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
        const {
            params: { boardId },
        } = request;

        const foundBoard = await this._boardService.getById(boardId);

        return response.status(HttpStatus.OK).json(foundBoard);
    };

    public create: RequestHandler = async (request: Request, response: Response): Promise<Response> => {
        const { body } = request;

        const createdBoard = await this._boardService.create(body);

        return response.status(HttpStatus.Created).json(createdBoard);
    };

    public updateById: RequestHandler = async (request: Request, response: Response): Promise<void> => {
        const {
            body,
            params: { boardId },
        } = request;

        await this._boardService.updateById(boardId, body);

        return response.status(HttpStatus.NoContent).end();
    };

    public deleteById: RequestHandler = async (request: Request, response: Response): Promise<void> => {
        const {
            params: { boardId },
        } = request;

        await this._boardService.deleteById(boardId);

        return response.status(HttpStatus.NoContent).end();
    };
}

export default BoardController;
