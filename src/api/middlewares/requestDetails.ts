import { Request, Response, NextFunction } from 'express';

export const requestDetails = (request: Request, response: Response, next: NextFunction): void => {
    const { body, originalUrl: endpoint, method, ip, user = null } = request;

    request.requestDetails = {
        body,
        endpoint,
        method,
        ip,
        user,
    };

    return next();
};

export default requestDetails;
