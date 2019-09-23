const express = require('express');
const { Container } = require('typedi');

const middlewares = require('../middlewares');
const schemes = require('../schemes');
const UserModel = require('../../models/UserModel');
const AuthService = require('../../services/AuthService');
const AuthController = require('../../controllers/AuthController');

Container.set('userModel', new UserModel());
Container.set('authService', new AuthService(Container));
Container.set('authController', new AuthController(Container));

const authController = Container.get('authController');
const router = express.Router();

router.post(
    '/signup',
    middlewares.checkBodyValidation(schemes.signupScheme),
    middlewares.requestCover(authController.signUp)
);

router.post(
    '/login',
    middlewares.checkBodyValidation(schemes.loginScheme),
    middlewares.requestCover(authController.logIn)
);

module.exports = router;
