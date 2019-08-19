class BoardService {
    constructor(container) {
        this.boardModel = container.get('boardModel');
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

    async getById(boardId) {
        const foundBoard = await this.boardModel.findById(boardId);

        return foundBoard;
    }

    async updateById(boardId, { name, color, description }) {
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

    async deleteById(boardId) {
        const deletedBoard = await this.boardModel.findByIdAndDelete(boardId);

        return deletedBoard;
    }
}

module.exports = BoardService;
