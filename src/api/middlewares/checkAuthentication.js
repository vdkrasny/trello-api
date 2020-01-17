import jwt from 'jsonwebtoken';

import { AuthenticationException } from '../../exceptions/AuthenticationException';
import config from '../../config';

export default (request, response, next) => {
    const authHeader = request.get('Authorization') || '';
    const [, token = ''] = authHeader.split(' ');

    try {
        const parsedUser = jwt.verify(token, config.jwt.secret);

        request.user = parsedUser;

        return next();
    } catch (error) {
        return next(new AuthenticationException('You are not authenticated'));
    }
};
