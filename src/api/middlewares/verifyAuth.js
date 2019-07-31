const jwt = require('jsonwebtoken');

const config = require('../../config');
const StatusError = require('../../helpers/StatusError');

module.exports = (request, response, next) => {
    const token = request.headers[config.headers.authToken];

    if (!token) {
        return next(new StatusError(401, 'You are not authorized'));
    }

    try {
        const verifiedUser = jwt.verify(token, config.jwt.secret);

        request.user = verifiedUser;

        return next();
    } catch (error) {
        return next(new StatusError(400, 'Invalid token.'));
    }
};
