const Model = require('./Model');

class BoardModel extends Model {
    constructor() {
        super('boards');
    }
}

const boardModelInstance = new BoardModel();

module.exports = boardModelInstance;
