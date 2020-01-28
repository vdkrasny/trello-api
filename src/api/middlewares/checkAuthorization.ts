import { Request, Response, NextFunction } from 'express';

import { UserRoles } from '../../enums/UserRoles';
import { AuthorizationException } from '../../exceptions/AuthorizationException';

export const checkAuthorization = (request: Request, response: Response, next: NextFunction): void => {
    const { user } = request;

    if (user.role !== UserRoles.admin) {
        return next(new AuthorizationException('You do not have access to this resource.'));
    }

    return next();
};

export default checkAuthorization;
