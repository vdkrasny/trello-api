const express = require('express');

const { validator } = require('../middlewares');
const { signupScheme, signinScheme } = require('../schemes');
const AuthService = require('../../services/AuthService');
const config = require('../../config');
const StatusError = require('../../helpers/StatusError');

const router = express.Router();
const authService = new AuthService();

router.post(
    '/signup',
    validator(signupScheme),
    async (request, response, next) => {
        try {
            if (request.user) return next(new StatusError(400, 'You are already authorized.'));

            const { user, token } = await authService.signUp(request.body);

            return response
                .status(201)
                .json({ user, token });
        } catch (error) {
            return next(error);
        }
    }
);

router.post(
    '/signin',
    validator(signinScheme),
    async (request, response, next) => {
        try {
            if (request.user) return next(new StatusError(400, 'You are already authorized.'));

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
