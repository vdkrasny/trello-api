import { Errback, Request, Response, NextFunction } from 'express';

import logger from '../../helpers/logger';
import { HttpException } from '../../exceptions/HttpException';

export const logErrors = (error: Errback, request: Request, response: Response, next: NextFunction): void => {
    if (error instanceof HttpException) {
        logger.log('debug', `Error detected: ${error.message}. \nRequest details: \n%o`, request.requestDetails);
    } else {
        logger.log('error', error.toString());
    }

    return next(error);
};

export default logErrors;
