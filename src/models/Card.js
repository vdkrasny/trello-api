const Collection = require('./Collection');

class Card extends Collection {
    constructor() {
        super('cards');
    }
}

module.exports = new Card();
