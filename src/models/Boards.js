const Joi = require('@hapi/joi');
const Collection = require('./Collection');

class Boards extends Collection {
    constructor(schema) {
        super('boards', schema);
    }
}

const schema = Joi
    .object()
    .keys({
        'name': Joi
            .string()
            .required(),
        'color': Joi
            .string()
            .max(9)
            .required(),
        'description': Joi
            .string()
            .required(),
        'createdAt': Joi
            .date()
            .max('now')
            .required(),
        'id': Joi
            .string()
            .required()
    });

module.exports = new Boards(schema);
