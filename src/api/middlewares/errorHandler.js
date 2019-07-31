const logger = require('../../helpers/logger');

module.exports = (error, request, response, next) => {
    const { status, message } = error;
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

    if (status) {
        const requestDetails = {
            endpoint,
            method,
            ip,
            body
        };

        logger.log(
            'debug',
            `The user [${user.login} | ${user.role}] received an error message: %o. Request details: %o`,
            message,
            requestDetails
        );

        return response
            .status(status)
            .json({
                error: { message }
            });
    }

    logger.log('error', error);

    return response
        .status(500)
        .json({
            error: { message: 'Something went wrong' }
        });
};
