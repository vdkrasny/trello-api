import StatusError from './StatusError';

class NotFoundError extends StatusError {
    constructor(message) {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}

export default NotFoundError;
