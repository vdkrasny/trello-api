const StatusError = require('./StatusError');

class ValidationError extends StatusError {
    constructor(message) {
        super(message, 400);
        this.name = 'ValidationError';
    }
}

module.exports = ValidationError;
