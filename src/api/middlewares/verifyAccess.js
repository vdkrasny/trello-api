const StatusError = require('../../helpers/StatusError');

module.exports = (request, response, next) => {
    const { user } = request;

    if (user.role !== 'admin') {
        return next(new StatusError(403, 'You do not have access to this resource'));
    }

    return next();
};
