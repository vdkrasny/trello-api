const express = require('express');

const middlewares = require('../middlewares');
const schemes = require('../schemes');
const AuthController = require('../../controllers/AuthController');

const router = express.Router();

router.post(
    '/signup',
    middlewares.bodyValidator(schemes.signinScheme),
    middlewares.requestCover(AuthController.signUp)
);

router.post(
    '/login',
    middlewares.bodyValidator(schemes.loginScheme),
    middlewares.requestCover(AuthController.logIn)
);

module.exports = router;
