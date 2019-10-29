const checkAuthentication = require('./checkAuthentication');
const checkAuthorization = require('./checkAuthorization');
const checkBodyValidation = require('./checkBodyValidation');
const errorHandler = require('./errorHandler');
const logActivity = require('./logActivity');
const logErrors = require('./logErrors');
const notFound = require('./notFound');
const requestCover = require('./requestCover');
const requestDetails = require('./requestDetails');

module.exports = {
    checkAuthentication,
    checkAuthorization,
    checkBodyValidation,
    errorHandler,
    logActivity,
    logErrors,
    notFound,
    requestCover,
    requestDetails,
};
