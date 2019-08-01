const joi = require('@hapi/joi');

const loginScheme = joi
    .object()
    .keys({
        login: joi
            .string()
            .min(5)
            .max(50)
            .required(),
        password: joi
            .string()
            .min(5)
            .required()
    });

module.exports = loginScheme;
