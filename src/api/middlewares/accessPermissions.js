class AccessPermissions {
    forAuthorized(request, response, next) {
        const { user } = request;

        if (!user) return next(new Error('You are not authorized'));

        return next();
    }

    forAdmin(request, response, next) {
        const { user } = request;

        if (user.role !== 'admin') return next(new Error('You do not have access to this resource'));

        return next();
    }
}

module.exports = new AccessPermissions();
