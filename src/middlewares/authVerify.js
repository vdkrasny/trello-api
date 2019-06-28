const jwt = require('jsonwebtoken');
const { authSecret } = require('../../constants');

module.exports = (request, response, next) => {
    const token = request.cookies.authToken;

    if (token) {
        try {
            const user = jwt.verify(token, authSecret);

            request.user = user;
        } catch (error) {
            return next(error);
        }
    }

    return next();
};
