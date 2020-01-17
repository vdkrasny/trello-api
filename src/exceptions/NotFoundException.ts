import { HttpException } from './HttpException';

export class NotFoundException extends HttpException {
    constructor(public message: string) {
        super(message, 404, 'NotFoundException');
    }
}

export default NotFoundException;
