const Collection = require('./Collection');

class Board extends Collection {
    constructor() {
        super('boards');
    }
}

module.exports = new Board();
