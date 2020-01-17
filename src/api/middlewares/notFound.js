import { HttpStatus } from '../../enums/HttpStatus';

export default (request, response, next) =>
    response.status(HttpStatus.NotFound).json({
        error: { message: 'Endpoint not found!' },
    });
