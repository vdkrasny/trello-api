class AuthController {
    constructor(container) {
        this.authService = container.get('authService');
    }

    signUp = async (request, response) => {
        const { userId, token } = await this.authService.signUp(request.body);

        return response.status(201).json({ userId, token });
    };

    logIn = async (request, response) => {
        const { userId, token } = await this.authService.logIn(request.body);

        return response.status(200).json({ userId, token });
    };
}

export default AuthController;
