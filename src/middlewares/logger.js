const { createLogger, format, transports } = require('winston');
const constants = require('../../constants');

const logger = createLogger();

if (process.env.NODE_ENV === constants.env.prod) {
    logger.add(new transports.File({
        filename: 'process.log',
        format: format.json()
    }));
} else {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple(),
        )
    }));
}

module.exports = (request, response, next) => {
    logger.info(`${request.method} request was sent to the ${request.url} by ${request.get('user-agent')}`);
    next();
};
