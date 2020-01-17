import logger from '../../helpers/logger';

export default (error, request, response, next) => {
    if (error.httpStatus) {
        logger.log('debug', `Error detected: ${error.message}. \nRequest details: \n%o`, request.requestDetails);
    } else {
        logger.log('error', error);
    }

    return next(error);
};
