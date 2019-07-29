module.exports = (request, response, next) => {
    const error = new Error('Not Found');
    error.status = 404;

    return next(error);
};
