import { HttpException } from './HttpException';
import { HttpStatus } from '../enums/HttpStatus';

export class AuthenticationException extends HttpException {
    constructor(public message: string) {
        super(message, HttpStatus.Unauthorized, 'AuthenticationException');
    }
}

export default AuthenticationException;
