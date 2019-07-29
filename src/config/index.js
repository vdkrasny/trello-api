process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = Object.freeze({
    port: parseInt(process.env.PORT, 10) || 3000,
    hashSalt: process.env.HASH_SALT || 12,
    jwt: {
        secret: process.env.JWT_SECRET || 'theSecret',
        expiresIn: '7d'
    },
    headers: {
        authToken: 'x-auth-token'
    },
    api: {
        prefix: '/api'
    }
});
