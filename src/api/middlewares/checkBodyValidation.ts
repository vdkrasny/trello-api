import { RequestHandler, Request, Response, NextFunction } from 'express';
import { Schema } from '@hapi/joi';

import { ValidationException } from '../../exceptions/ValidationException';

export const checkBodyValidation = (validationSchema: Schema): RequestHandler => {
    return (request: Request, response: Response, next: NextFunction): void => {
        const validator = validationSchema.validate(request.body);

        if (!validator.error) {
            return next();
        }

        const [{ message }] = validator.error.details;

        return next(new ValidationException(message));
    };
};

export default checkBodyValidation;
