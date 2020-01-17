import { HttpStatus } from '../../enums/HttpStatus';

export default (error, request, response, next) => {
    const status = error.httpStatus || HttpStatus.InternalServerError;
    const message = error.message || 'Something went wrong';

    return response.status(status).json({
        error: { message },
    });
};
