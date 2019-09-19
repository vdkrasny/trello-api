const StatusError = require('../../errors/StatusError');
const logger = require('../../helpers/logger');

module.exports = (error, request, response, next) => {
    if (error instanceof StatusError) {
        logger.log(
            'debug',
            `Error detected: ${error.message}. \nRequest details: \n%o`,
            request.requestDetails
        );
    } else {
        logger.log('error', error);
    }

    return next(error);
};
