const Model = require('./Model');

class UserModel extends Model {
    constructor() {
        super('users');
    }

    async findByLogin(login) {
        const collection = await this.getCollection();
        const targetUser = collection.find(({ login: itemLogin }) => itemLogin === String(login));

        if (!targetUser) {
            return undefined;
        }

        return targetUser;
    }
}

const userModelInstance = new UserModel();

module.exports = userModelInstance;
