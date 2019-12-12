import StatusError from './StatusError';

class AuthenticationError extends StatusError {
    constructor(message) {
        super(message, 401);
        this.name = 'AuthenticationError';
    }
}

export default AuthenticationError;
