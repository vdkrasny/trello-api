const Joi = require('@hapi/joi');
const Collection = require('./Collection');

class Card extends Collection {
    constructor(schema) {
        super('cards', schema);
    }
}

const schema = Joi.object()
    .keys({
        'name': Joi
            .string()
            .required(),
        'description': Joi
            .string()
            .required(),
        'createdAt': Joi
            .date()
            .max('now')
            .required(),
        'estimate': Joi
            .string()
            .required(),
        'status': Joi
            .string()
            .valid('to-do', 'in-progress', 'done')
            .required(),
        'dueDate': Joi
            .date()
            .required(),
        'labels': Joi
            .array()
            .items(Joi.string())
            .required(),
        'id': Joi
            .string()
            .required()
    });

module.exports = new Card(schema);
