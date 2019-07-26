const Model = require('./Model');

class UserModel extends Model {
    constructor() {
        super('users');
    }
}

const userModelInstance = new UserModel();

module.exports = userModelInstance;
