const BoardModel = require('../models/BoardModel');

class BoardService {
    constructor(boardModel) {
        this.boardModel = boardModel || new BoardModel();
    }

    async create({ name, color, description }) {
        try {
            const newBoard = {
                name,
                color,
                description,
                createdAt: new Date()
            };
            const createdBoard = await this.boardModel.create(newBoard);

            return createdBoard;
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            const boards = await this.boardModel.findAll();

            return boards;
        } catch (error) {
            throw error;
        }
    }

    async findById(boardId) {
        try {
            const foundBoard = await this.boardModel.findById(boardId);

            return foundBoard;
        } catch (error) {
            throw error;
        }
    }

    async findByIdAndUpdate(boardId, { name, color, description }) {
        try {
            const updatedBoard = await this.boardModel.findByIdAndUpdate(
                boardId,
                {
                    name,
                    color,
                    description
                }
            );

            return updatedBoard;
        } catch (error) {
            throw error;
        }
    }

    async findByIdAndDelete(boardId) {
        try {
            const deletedBoard = await this.boardModel.findByIdAndDelete(boardId);

            return deletedBoard;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = BoardService;
