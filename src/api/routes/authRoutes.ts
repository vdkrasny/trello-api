import { Router } from 'express';
import { Container } from 'typedi';

import middlewares from '../middlewares';
import schemes from '../schemes';
import { AuthController } from '../../controllers/AuthController';

const authController = Container.get(AuthController);
const router = Router();

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
