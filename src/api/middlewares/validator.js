const joi = require('@hapi/joi');

module.exports = schema => (request, response, next) => {
    const validator = joi.validate(request.body, schema);

    if (!validator.error) return next();

    return response
        .status(400)
        .json({
            error: validator.error.details[0].message
        });
};
