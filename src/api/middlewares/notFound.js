module.exports = (request, response, next) =>
    response.status(404).json({
        error: { message: 'Endpoint not found!' },
    });
