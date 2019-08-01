const jwt = require('jsonwebtoken');

const AuthorizationError = require('../../errors/AuthorizationError');
const ValidationError = require('../../errors/ValidationError');
const config = require('../../config');

module.exports = (request, response, next) => {
    const token = request.headers[config.headers.authToken];

    if (!token) {
        return next(new AuthorizationError('You are not authorized'));
    }

    try {
        const verifiedUser = jwt.verify(token, config.jwt.secret);

        request.user = verifiedUser;

        return next();
    } catch (error) {
        return next(new ValidationError('Invalid token'));
    }
};
