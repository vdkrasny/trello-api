const Model = require('./Model');

class UserModel extends Model {
    constructor() {
        super('users');
    }
}

module.exports = UserModel;
