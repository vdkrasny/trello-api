const joi = require('@hapi/joi');

const ValidationError = require('../../errors/ValidationError');

module.exports = schema => (request, response, next) => {
    const validator = joi.validate(request.body, schema);

    if (!validator.error) {
        return next();
    }

    return next(new ValidationError(validator.error.details[0].message));
};
