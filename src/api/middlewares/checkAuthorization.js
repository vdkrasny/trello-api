const AuthorizationError = require('../../errors/AuthorizationError');

module.exports = (request, response, next) => {
    const { user } = request;

    if (user.role !== 'admin') {
        return next(new AuthorizationError('You do not have access to this resource'));
    }

    return next();
};
