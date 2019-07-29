const jwt = require('jsonwebtoken');
const config = require('../../config');

module.exports = (request, response, next) => {
    const token = request.headers[config.headers.authToken];

    if (!token) {
        return response
            .status(401)
            .send('Access denied. No token provided.');
    }

    try {
        const verifiedUser = jwt.verify(token, config.jwt.secret);

        request.user = verifiedUser;
    } catch (error) {
        return response
            .status(400)
            .send('Invalid token.');
    }

    return next();
};
