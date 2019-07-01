const jwt = require('jsonwebtoken');
const { authSecret } = require('../../constants');

module.exports = (request, response, next) => {
    const token = request.headers['x-auth-token'];

    if (token) {
        try {
            const verifiedUser = jwt.verify(token, authSecret);

            request.user = verifiedUser;
        } catch (error) {
            return next(error);
        }
    }

    return next();
};
