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
