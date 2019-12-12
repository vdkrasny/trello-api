import logger from '../../helpers/logger';

export default (request, response, next) => {
    logger.log('debug', 'Activity detected. \nRequest details: \n%o', request.requestDetails);

    return next();
};
