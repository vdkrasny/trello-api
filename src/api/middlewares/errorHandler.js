import StatusError from '../../errors/StatusError';

export default (error, request, response, next) => {
    if (error instanceof StatusError) {
        return response.status(error.status || 500).json({
            error: { message: error.message },
        });
    }

    return response.status(500).json({
        error: { message: 'Something went wrong' },
    });
};
