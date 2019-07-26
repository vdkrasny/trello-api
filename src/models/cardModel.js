const Model = require('./Model');

class Card extends Model {
    constructor() {
        super('cards');
    }
}

module.exports = new Card();
