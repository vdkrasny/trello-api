import joi from '@hapi/joi';

export default joi.object().keys({
    login: joi
        .string()
        .min(5)
        .max(50)
        .required(),
    password: joi
        .string()
        .min(5)
        .required(),
});
