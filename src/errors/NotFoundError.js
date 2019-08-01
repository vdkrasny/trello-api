const StatusError = require('./StatusError');

class NotFoundError extends StatusError {
    constructor(message) {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}

module.exports = NotFoundError;
