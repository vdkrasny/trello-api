process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = Object.freeze({
    port: parseInt(process.env.PORT, 10) || 3000,
    jwt: {
        secret: process.env.JWT_SECRET || 'theSecret',
        expiresIn: '7d'
    },
    api: {
        prefix: '/api'
    }
});
