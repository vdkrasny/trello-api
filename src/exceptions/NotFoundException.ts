import { HttpException } from './HttpException';
import { HttpStatus } from '../enums/HttpStatus';

export class NotFoundException extends HttpException {
    constructor(public message: string) {
        super(message, HttpStatus.NotFound, 'NotFoundException');
    }
}

export default NotFoundException;
