const Joi = require('@hapi/joi');
const Collection = require('./Collection');

class User extends Collection {
    constructor(schema) {
        super('users', schema);
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

const schema = Joi.object()
    .keys({
        'login': Joi
            .string()
            .min(5)
            .max(50)
            .required(),
        'password': Joi
            .string()
            .min(7)
            .required(),
        'role': Joi
            .string()
            .valid('user', 'admin')
            .required(),
        'id': Joi
            .string()
            .required()
    });

module.exports = new User(schema);
