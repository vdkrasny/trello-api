import { ValidationException } from '../../exceptions/ValidationException';

export default validationSchema => (request, response, next) => {
    const validator = validationSchema.validate(request.body);

    if (!validator.error) {
        return next();
    }

    return next(new ValidationException(validator.error.details[0].message));
};
