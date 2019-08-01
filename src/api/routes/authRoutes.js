const express = require('express');

const middlewares = require('../middlewares');
const schemes = require('../schemes');
const AuthController = require('../../controllers/AuthController');

const router = express.Router();

router.post(
    '/signup',
    middlewares.validator(schemes.signinScheme),
    middlewares.requestCover(AuthController.signUp)
);

router.post(
    '/signin',
    middlewares.validator(schemes.signinScheme),
    middlewares.requestCover(AuthController.signIn)
);

module.exports = router;
