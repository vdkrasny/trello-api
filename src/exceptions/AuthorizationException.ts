import { HttpException } from './HttpException';

export class AuthorizationException extends HttpException {
    constructor(public message: string) {
        super(message, 403, 'AuthorizationException');
    }
}

export default AuthorizationException;
