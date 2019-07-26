const Model = require('./Model');

class User extends Model {
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

module.exports = new User();
