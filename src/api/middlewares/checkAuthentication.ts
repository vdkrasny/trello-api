import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { User } from '../../types/User';
import config from '../../config';
import { AuthenticationException } from '../../exceptions/AuthenticationException';

export const checkAuthentication = (request: Request, response: Response, next: NextFunction): void => {
    const authenticationErrorMessage = 'You are not authenticated.';
    const authHeader = request.get('Authorization');

    if (!authHeader) {
        return next(new AuthenticationException(authenticationErrorMessage));
    }

    const [, token = ''] = authHeader.split(' ');

    try {
        const parsedUser = verify(token, config.jwt.secret) as User;

        request.user = parsedUser;

        return next();
    } catch (error) {
        return next(new AuthenticationException(authenticationErrorMessage));
    }
};

export default checkAuthentication;
