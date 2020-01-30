import { HttpException } from './HttpException';
import { HttpStatus } from '../enums/HttpStatus';

export class AuthorizationException extends HttpException {
    constructor(public message: string) {
        super(message, HttpStatus.Forbidden, 'AuthorizationException');
    }
}

export default AuthorizationException;
