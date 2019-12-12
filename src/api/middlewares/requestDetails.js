export default (request, response, next) => {
    const { body, originalUrl: endpoint, method, ip, user = null } = request;

    const requestDetails = {
        body,
        endpoint,
        method,
        ip,
        user,
    };

    request.requestDetails = requestDetails;

    return next();
};
