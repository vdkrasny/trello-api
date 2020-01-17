import { HttpException } from './HttpException';
import { HttpStatus } from '../enums/HttpStatus';

export class ValidationException extends HttpException {
    constructor(public message: string) {
        super(message, HttpStatus.BadRequest, 'ValidationException');
    }
}

export default ValidationException;
