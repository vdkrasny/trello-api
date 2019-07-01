const boardModel = require('../models/Board');

class BoardsController {
    async create(request, response, next) {
        const { body: { name, color, description } } = request;

        try {
            const newBoard = {
                name,
                color,
                description,
                createdAt: new Date()
            };
            const boards = await boardModel.create(newBoard);

            return response.json(boards);
        } catch (error) {
            return next(error);
        }
    }

    async findAll(request, response, next) {
        try {
            const boards = await boardModel.getCollection();

            return response.json(boards);
        } catch (error) {
            return next(error);
        }
    }

    async findById(request, response, next) {
        const { params: { boardId } } = request;

        try {
            const foundBoard = await boardModel.findById(boardId);

            if (!foundBoard) {
                throw new Error('Not found');
            }

            return response.json(foundBoard);
        } catch (error) {
            return next(error);
        }
    }

    async findByIdAndUpdate(request, response, next) {
        const {
            body,
            params: { boardId }
        } = request;

        try {
            const updatedBoard = await boardModel.findByIdAndUpdate(boardId, body);

            if (!updatedBoard) {
                throw new Error('Not found');
            }

            return response.json(updatedBoard);
        } catch (error) {
            return next(error);
        }
    }

    async findByIdAndDelete(request, response, next) {
        const { params: { boardId } } = request;

        try {
            const deletedBoard = await boardModel.findByIdAndDelete(boardId);

            if (!deletedBoard) {
                throw new Error('Not found');
            }

            return response.json(deletedBoard);
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new BoardsController();
