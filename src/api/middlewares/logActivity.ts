import { Request, Response, NextFunction } from 'express';

import logger from '../../helpers/logger';

export const logActivity = (request: Request, response: Response, next: NextFunction): void => {
    logger.log('debug', 'Activity detected. \nRequest details: \n%o', request.requestDetails);

    return next();
};

export default logActivity;
