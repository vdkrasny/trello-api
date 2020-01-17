import { HttpException } from './HttpException';

export class ValidationException extends HttpException {
    constructor(public message: string) {
        super(message, 400, 'ValidationException');
    }
}

export default ValidationException;
