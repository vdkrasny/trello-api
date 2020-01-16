class BoardController {
    constructor(container) {
        this.boardService = container.get('boardService');
    }

    getAll = async (_, response) => {
        const boards = await this.boardService.getAll();

        return response.status(200).json(boards);
    };

    getById = async (request, response) => {
        const {
            params: { boardId },
        } = request;

        const foundBoard = await this.boardService.getById(boardId);

        return response.status(200).json(foundBoard);
    };

    create = async (request, response) => {
        const { body } = request;

        const createdBoard = await this.boardService.create(body);

        return response.status(201).json(createdBoard);
    };

    updateById = async (request, response) => {
        const {
            body,
            params: { boardId },
        } = request;

        await this.boardService.updateById(boardId, body);

        return response.status(204).end();
    };

    deleteById = async (request, response) => {
        const {
            params: { boardId },
        } = request;

        await this.boardService.deleteById(boardId);

        return response.status(204).end();
    };
}

export default BoardController;
