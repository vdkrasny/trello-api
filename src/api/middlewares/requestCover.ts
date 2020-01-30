import { RequestHandler, Request, Response, NextFunction } from 'express';

export const requestCover = (fn: RequestHandler): RequestHandler => {
    return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            return await fn(request, response, next);
        } catch (error) {
            return next(error);
        }
    };
};

export default requestCover;
