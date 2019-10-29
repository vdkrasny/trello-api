const logger = require('../../helpers/logger');

module.exports = (request, response, next) => {
    logger.log('debug', 'Activity detected. \nRequest details: \n%o', request.requestDetails);

    return next();
};
