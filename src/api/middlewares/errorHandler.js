export default (error, request, response, next) => {
    const status = error.httpStatus || 500;
    const message = error.message || 'Something went wrong';

    return response.status(status).json({
        error: { message },
    });
};
