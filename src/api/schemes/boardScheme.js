import joi from '@hapi/joi';

export default joi.object().keys({
    name: joi.string().required(),
    color: joi
        .string()
        .max(9)
        .required(),
    description: joi.string().required(),
});
