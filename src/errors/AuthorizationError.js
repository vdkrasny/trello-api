import StatusError from './StatusError';

class AuthorizationError extends StatusError {
    constructor(message) {
        super(message, 403);
        this.name = 'AuthorizationError';
    }
}

export default AuthorizationError;
