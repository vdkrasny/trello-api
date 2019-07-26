const Model = require('./Model');

class CardModel extends Model {
    constructor() {
        super('cards');
    }
}

const cardModelInstance = new CardModel();

module.exports = cardModelInstance;
