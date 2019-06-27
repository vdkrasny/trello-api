module.exports = (error, request, response, next) => response.json(error.message);
