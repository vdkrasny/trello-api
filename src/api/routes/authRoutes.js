const express = require('express');

const middlewares = require('../middlewares');
const schemes = require('../schemes');
const AuthService = require('../../services/AuthService');
const config = require('../../config');

const router = express.Router();
const authService = new AuthService();

router.post(
    '/signup',
    middlewares.validator(schemes.signinScheme),
    async (request, response, next) => {
        try {
            const { user, token } = await authService.signUp(request.body);

            response.setHeader(config.headers.authToken, token);

            return response
                .status(201)
                .json({ user });
        } catch (error) {
            return next(error);
        }
    }
);

router.post(
    '/signin',
    middlewares.validator(schemes.signinScheme),
    async (request, response, next) => {
        try {
            const { user, token } = await authService.signIn(request.body);

            response.setHeader(config.headers.authToken, token);

            return response
                .status(200)
                .json({ user });
        } catch (error) {
            return next(error);
        }
    }
);

module.exports = router;
