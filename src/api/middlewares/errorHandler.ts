import { Errback, Request, Response, NextFunction } from 'express';

import { HttpException } from '../../exceptions/HttpException';
import { HttpStatus } from '../../enums/HttpStatus';

export const errorHandler = (error: Errback, request: Request, response: Response, next: NextFunction): Response => {
    let status: number;
    let message: string;

    if (error instanceof HttpException) {
        status = error.httpStatus;
        message = error.message;
    } else {
        status = HttpStatus.InternalServerError;
        message = 'Something went wrong.';
    }

    return response.status(status).json({
        error: { message },
    });
};

export default errorHandler;
