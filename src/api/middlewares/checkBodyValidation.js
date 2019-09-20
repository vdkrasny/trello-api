const ValidationError = require('../../errors/ValidationError');

module.exports = validationSchema => (request, response, next) => {
    const validator = validationSchema.validate(request.body);

    if (!validator.error) {
        return next();
    }

    return next(new ValidationError(validator.error.details[0].message));
};
