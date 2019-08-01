const StatusError = require('../helpers/StatusError');
const BoardService = require('../services/BoardService');

const boardService = new BoardService();

class BoardController {
    static async getAll(request, response) {
        const boards = await boardService.getAll();

        return response
            .status(200)
            .json(boards);
    }

    static async getById(request, response) {
        const { params: { boardId } } = request;

        const foundBoard = await boardService.getById(boardId);

        if (!foundBoard) {
            throw new StatusError(404, 'Not Found');
        }

        return response
            .status(200)
            .json(foundBoard);
    }

    static async create(request, response) {
        const { body } = request;

        const createdBoard = await boardService.create(body);

        return response
            .status(201)
            .json(createdBoard);
    }

    static async updateById(request, response) {
        const {
            body,
            params: { boardId }
        } = request;

        const updatedBoard = await boardService.updateById(boardId, body);

        if (!updatedBoard) {
            throw new StatusError(404, 'Not Found');
        }

        return response
            .status(204)
            .end();
    }

    static async deleteById(request, response) {
        const { params: { boardId } } = request;

        const deletedBoard = await boardService.deleteById(boardId);

        if (!deletedBoard) {
            throw new StatusError(404, 'Not Found');
        }

        return response
            .status(204)
            .end();
    }
}

module.exports = BoardController;
