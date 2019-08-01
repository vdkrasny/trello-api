const AccessError = require('../../errors/AccessError');

module.exports = (request, response, next) => {
    const { user } = request;

    if (user.role !== 'admin') {
        return next(new AccessError('You do not have access to this resource'));
    }

    return next();
};
