class AuthController {
    constructor(container) {
        this.authService = container.get('authService');

        this.signUp = this.signUp.bind(this);
        this.logIn = this.logIn.bind(this);
    }

    async signUp(request, response) {
        const { userId, token } = await this.authService.signUp(request.body);

        return response.status(201).json({ userId, token });
    }

    async logIn(request, response) {
        const { userId, token } = await this.authService.logIn(request.body);

        return response.status(200).json({ userId, token });
    }
}

module.exports = AuthController;
