const joi = require('@hapi/joi');

const StatusError = require('../../helpers/StatusError');

module.exports = schema => (request, response, next) => {
    const validator = joi.validate(request.body, schema);

    if (!validator.error) return next();

    return next(new StatusError(400, validator.error.details[0].message));
};
