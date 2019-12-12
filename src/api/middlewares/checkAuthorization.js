import AuthorizationError from '../../errors/AuthorizationError';

export default (request, response, next) => {
    const { user } = request;

    if (user.role !== 'admin') {
        return next(new AuthorizationError('You do not have access to this resource'));
    }

    return next();
};
