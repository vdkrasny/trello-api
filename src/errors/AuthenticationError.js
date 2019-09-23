const StatusError = require('./StatusError');

class AuthenticationError extends StatusError {
    constructor(message) {
        super(message, 401);
        this.name = 'AuthenticationError';
    }
}

module.exports = AuthenticationError;
