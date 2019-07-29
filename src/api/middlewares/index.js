const accessPermissions = require('./accessPermissions');
const authVerify = require('./authVerify');
const errorHandler = require('./errorHandler');
const notFound = require('./notFound');
const validator = require('./validator');

module.exports = {
    accessPermissions,
    authVerify,
    errorHandler,
    notFound,
    validator
};
