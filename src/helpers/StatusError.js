class StatusError extends Error {
    constructor(status = 500, ...args) {
        super(...args);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, StatusError);
        }

        this.name = 'StatusError';
        this.status = status;
    }
}

module.exports = StatusError;
