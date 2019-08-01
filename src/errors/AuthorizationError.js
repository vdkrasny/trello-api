const StatusError = require('./StatusError');

class AuthorizationError extends StatusError {
    constructor(message) {
        super(message, 401);
        this.name = 'AuthorizationError';
    }
}

module.exports = AuthorizationError;
