const Joi = require('@hapi/joi');
const DatabaseClient = require('../../database/DatabaseClient');

class Users {
    constructor(collectionName, schema) {
        this._collectionClient = new DatabaseClient(collectionName);
        this.schema = schema;
    }

    validate(collectionItem) {
        const validator = Joi.validate(collectionItem, this._schema);

        if (validator.error) {
            throw new Error(validator.error);
        }

        return undefined;
    }

    async create(body = {}) {
        const collection = await this.getCollection();
        const randomId = Math.random()
            .toString(36)
            .substr(2, 9);
        const item = {
            ...body,
            id: randomId
        };

        this.validate(item);
        collection.push(item);
        await this.saveCollection(collection);

        return item;
    }

    async findByLogin(login) {
        const collection = await this.getCollection();
        const targetUser = collection.find(({ login: itemLogin }) => itemLogin === String(login));

        if (!targetUser) {
            return undefined;
        }

        return targetUser;
    }

    async saveCollection(collection) {
        await this._collectionClient.write(collection);

        return undefined;
    }

    async getCollection() {
        const collection = await this._collectionClient.read();

        return collection;
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

module.exports = new Users('users', schema);
