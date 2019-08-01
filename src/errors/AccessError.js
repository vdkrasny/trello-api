const StatusError = require('./StatusError');

class AccessError extends StatusError {
    constructor(message) {
        super(message, 403);
        this.name = 'AccessError';
    }
}

module.exports = AccessError;
