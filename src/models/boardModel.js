const Model = require('./Model');

class Board extends Model {
    constructor() {
        super('boards');
    }
}

module.exports = new Board();
