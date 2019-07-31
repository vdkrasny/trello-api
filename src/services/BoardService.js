const BoardModel = require('../models/BoardModel');

class BoardService {
    constructor(boardModel) {
        this.boardModel = boardModel || new BoardModel();
    }

    async create({ name, color, description }) {
        const newBoard = {
            name,
            color,
            description
        };
        const createdBoard = await this.boardModel.create(newBoard);

        return createdBoard;
    }

    async getAll() {
        const boards = await this.boardModel.getAll();

        return boards;
    }

    async findById(boardId) {
        const foundBoard = await this.boardModel.findById(boardId);

        return foundBoard;
    }

    async findByIdAndUpdate(boardId, { name, color, description }) {
        const updatedBoard = await this.boardModel.findByIdAndUpdate(
            boardId,
            {
                name,
                color,
                description
            }
        );

        return updatedBoard;
    }

    async findByIdAndDelete(boardId) {
        const deletedBoard = await this.boardModel.findByIdAndDelete(boardId);

        return deletedBoard;
    }
}

module.exports = BoardService;
