const config = require('../config');

class AuthController {
    constructor(container) {
        this.authService = container.get('authService');

        this.signUp = this.signUp.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    async signUp(request, response) {
        const { user, token } = await this.authService.signUp(request.body);

        response.setHeader(config.headers.authToken, token);

        return response
            .status(201)
            .json({ user });
    }

    async logIn(request, response) {
        const { user, token } = await this.authService.logIn(request.body);

        response.setHeader(config.headers.authToken, token);

        return response
            .status(200)
            .json({ user });
    }
}

module.exports = AuthController;
