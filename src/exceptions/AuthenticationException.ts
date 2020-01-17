import { HttpException } from './HttpException';

export class AuthenticationException extends HttpException {
    constructor(public message: string) {
        super(message, 401, 'AuthenticationException');
    }
}

export default AuthenticationException;
