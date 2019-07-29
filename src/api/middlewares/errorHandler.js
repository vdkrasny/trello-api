module.exports = (error, request, response, next) => {
    const { status, message } = error;

    return response
        .status(status || 500)
        .json({
            error: { message }
        });
};
