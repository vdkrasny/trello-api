export default Object.freeze({
    nodeEnv: process.env.NODE_ENV || 'development',
    nodeEnvTypes: {
        development: 'development',
        production: 'production',
    },
    port: parseInt(process.env.PORT || '3000', 10),
    jwt: {
        secret: process.env.JWT_SECRET || 'theSecret',
        expiresIn: '7d',
    },
    api: {
        prefix: '/api',
    },
    loggerLevel: process.env.LOGGER_LEVEL || 'silly',
});
