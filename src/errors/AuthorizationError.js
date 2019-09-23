const StatusError = require('./StatusError');

class AuthorizationError extends StatusError {
    constructor(message) {
        super(message, 403);
        this.name = 'AuthorizationError';
    }
}

module.exports = AuthorizationError;
