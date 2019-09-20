class BoardController {
    constructor(container) {
        this.boardService = container.get('boardService');

        this.getAll = this.getAll.bind(this);
        this.getById = this.getById.bind(this);
        this.create = this.create.bind(this);
        this.updateById = this.updateById.bind(this);
        this.deleteById = this.deleteById.bind(this);
    }

    async getAll(request, response) {
        const boards = await this.boardService.getAll();

        return response
            .status(200)
            .json(boards);
    }

    async getById(request, response) {
        const { params: { boardId } } = request;

        const foundBoard = await this.boardService.getById(boardId);

        return response
            .status(200)
            .json(foundBoard);
    }

    async create(request, response) {
        const { body } = request;

        const createdBoard = await this.boardService.create(body);

        return response
            .status(201)
            .json(createdBoard);
    }

    async updateById(request, response) {
        const {
            body,
            params: { boardId }
        } = request;

        await this.boardService.updateById(boardId, body);

        return response
            .status(204)
            .end();
    }

    async deleteById(request, response) {
        const { params: { boardId } } = request;

        await this.boardService.deleteById(boardId);

        return response
            .status(204)
            .end();
    }
}

module.exports = BoardController;
