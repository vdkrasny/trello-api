const config = require('../config');
const AuthService = require('../services/AuthService');

const authService = new AuthService();

class AuthController {
    static async signUp(request, response) {
        const { user, token } = await authService.signUp(request.body);

        response.setHeader(config.headers.authToken, token);

        return response
            .status(201)
            .json({ user });
    }

    static async logIn(request, response) {
        const { user, token } = await authService.logIn(request.body);

        response.setHeader(config.headers.authToken, token);

        return response
            .status(200)
            .json({ user });
    }
}

module.exports = AuthController;
