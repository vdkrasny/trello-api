import StatusError from './StatusError';

class ValidationError extends StatusError {
    constructor(message) {
        super(message, 400);
        this.name = 'ValidationError';
    }
}

export default ValidationError;
