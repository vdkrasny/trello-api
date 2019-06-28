const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authSecret } = require('../../constants');
const userModel = require('../models/User');

class AuthController {
    async login(request, response, next) {
        const {
            body: { login: requestLogin, password: requestPassword },
            user: requestUser
        } = request;

        try {
            if (requestUser) {
                throw new Error('You are already logged in.');
            }

            const foundUser = await userModel.findByLogin(requestLogin);

            if (foundUser) {
                const { password } = foundUser;
                const isPasswordCorrect = await bcrypt.compare(requestPassword, password);

                if (isPasswordCorrect) {
                    const token = jwt.sign(foundUser, authSecret, { expiresIn: 2000 });
                    response.cookie('authToken', token);

                    return response
                        .status(200)
                        .end();
                }
            }

            throw new Error('Username or password is incorrect');
        } catch (error) {
            return next(error);
        }
    }

    async signup(request, response, next) {
        const {
            body: { login, password },
            user: requestUser
        } = request;

        try {
            if (requestUser) {
                throw new Error('You are already logged in.');
            }

            if (login && password) {
                const hashedPassword = await bcrypt.hash(password, 12);
                const newUser = {
                    login,
                    password: hashedPassword,
                    role: 'user'
                };

                await userModel.create(newUser);

                return response
                    .status(200)
                    .end();
            }

            throw new Error('login and password is required');
        } catch (error) {
            return next(error);
        }
    }

    verifyUser(request, response, next) {
        try {
            const token = request.cookies.authToken;

            if (token) {
                const user = jwt.verify(token, authSecret);

                request.user = user;
            }

            return next();
        } catch (error) {
            return next(error);
        }
    }

    isAuth(request, response, next) {
        const { user } = request;

        try {
            if (!user) {
                throw new Error('You are not authorized');
            }

            return next();
        } catch (error) {
            return next(error);
        }
    }

    isAdmin(request, response, next) {
        const { user } = request;

        try {
            if (user.role !== 'admin') {
                throw new Error('You do not have access to this resource');
            }

            return next();
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = new AuthController();
