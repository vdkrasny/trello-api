module.exports = (request, response, next) => response
    .status(404)
    .json('Endpoint not found!');
