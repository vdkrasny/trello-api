const logger = require('../../helpers/logger');

module.exports = (request, response, next) => {
    const {
        user = {
            login: 'unauthorized',
            role: 'guest'
        },
        baseUrl: endpoint,
        body,
        ip,
        method
    } = request;

    const requestDetails = {
        endpoint,
        method,
        ip,
        body
    };

    logger.log(
        'debug',
        `Activity from the user [${user.login} | ${user.role}]. Request details: %o`,
        requestDetails
    );

    return next();
};
