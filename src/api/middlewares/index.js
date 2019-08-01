const activityLogger = require('./activityLogger');
const bodyValidator = require('./bodyValidator');
const errorHandler = require('./errorHandler');
const errorLogger = require('./errorLogger');
const notFound = require('./notFound');
const requestCover = require('./requestCover');
const requestDetails = require('./requestDetails');
const verifyAccess = require('./verifyAccess');
const verifyAuth = require('./verifyAuth');

module.exports = {
    activityLogger,
    bodyValidator,
    errorHandler,
    errorLogger,
    notFound,
    requestCover,
    requestDetails,
    verifyAccess,
    verifyAuth
};
