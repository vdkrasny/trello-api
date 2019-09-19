const jwt = require('jsonwebtoken');

const AuthenticationError = require('../../errors/AuthenticationError');
const config = require('../../config');

module.exports = (request, response, next) => {
    const token = request.headers[config.headers.authToken];

    if (!token) {
        return next(new AuthenticationError('You are not authenticated'));
    }

    try {
        const verifiedUser = jwt.verify(token, config.jwt.secret);

        request.user = verifiedUser;

        return next();
    } catch (error) {
        return next(new AuthenticationError('Invalid token'));
    }
};
