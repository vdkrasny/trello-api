import express from 'express';
import { Container } from 'typedi';

import middlewares from '../middlewares';
import schemes from '../schemes';
import { UserModel } from '../../models/UserModel';
import { AuthService } from '../../services/AuthService';
import { AuthController } from '../../controllers/AuthController';

Container.set('userModel', new UserModel());
Container.set('authService', new AuthService(Container));
Container.set('authController', new AuthController(Container));

const authController = Container.get<AuthController>('authController');
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

export default router;
