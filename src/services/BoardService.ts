import NotFoundError from '../errors/NotFoundError';
import { BoardModel, Board } from '../models/BoardModel';

export class BoardService {
    private _boardModel: BoardModel;

    constructor(container) {
        this._boardModel = container.get('boardModel');
    }

    public async create({ name, color, description }: Board): Promise<Board> {
        const createdBoard = await this._boardModel.create({
            name,
            color,
            description,
        });

        return createdBoard;
    }

    public async getAll(): Promise<Board[]> {
        const boards = await this._boardModel.getAll();

        return boards;
    }

    public async getById(boardId: string): Promise<Board> {
        const foundBoard = await this._boardModel.findById(boardId);

        if (!foundBoard) {
            throw new NotFoundError('The requested Board was not found');
        }

        return foundBoard;
    }

    public async updateById(boardId: string, { name, color, description }: Board): Promise<Board> {
        const updatedBoard = await this._boardModel.findByIdAndUpdate(boardId, {
            name,
            color,
            description,
        });

        if (!updatedBoard) {
            throw new NotFoundError('The requested Board was not found');
        }

        return updatedBoard;
    }

    public async deleteById(boardId: string): Promise<Board> {
        const deletedBoard = await this._boardModel.findByIdAndDelete(boardId);

        if (!deletedBoard) {
            throw new NotFoundError('The requested Board was not found');
        }

        return deletedBoard;
    }
}

export default BoardService;
