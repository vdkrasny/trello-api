import { AuthorizationException } from '../../exceptions/AuthorizationException';

export default (request, response, next) => {
    const { user } = request;

    if (user.role !== 'admin') {
        return next(new AuthorizationException('You do not have access to this resource'));
    }

    return next();
};
