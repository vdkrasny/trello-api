const Model = require('./Model');

class BoardModel extends Model {
    constructor() {
        super('boards');
    }
}

module.exports = BoardModel;
