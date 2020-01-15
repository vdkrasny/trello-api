import NotFoundError from '../errors/NotFoundError';
import { BoardModel, Board } from '../models/BoardModel';

export class BoardService {
    private boardModel: BoardModel;

    constructor(container) {
        this.boardModel = container.get('boardModel');
    }

    public async create({ name, color, description }: Board): Promise<Board> {
        const createdBoard = await this.boardModel.create({
            name,
            color,
            description,
        });

        return createdBoard;
    }

    public async getAll(): Promise<Board[]> {
        const boards = await this.boardModel.getAll();

        return boards;
    }

    public async getById(boardId: string): Promise<Board> {
        const foundBoard = await this.boardModel.findById(boardId);

        if (!foundBoard) {
            throw new NotFoundError('The requested Board was not found');
        }

        return foundBoard;
    }

    public async updateById(boardId: string, { name, color, description }: Board): Promise<Board> {
        const updatedBoard = await this.boardModel.findByIdAndUpdate(boardId, {
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
        const deletedBoard = await this.boardModel.findByIdAndDelete(boardId);

        if (!deletedBoard) {
            throw new NotFoundError('The requested Board was not found');
        }

        return deletedBoard;
    }
}

export default BoardService;
