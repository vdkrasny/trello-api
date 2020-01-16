import { Request, Response } from 'express';

import { AuthService } from '../services/AuthService';

export class AuthController {
    private _authService: AuthService;

    constructor(container) {
        this._authService = container.get('authService');
    }

    public signUp = async (request: Request, response: Response): Promise<Response> => {
        const { userId, token } = await this._authService.signUp(request.body);

        return response.status(201).json({ userId, token });
    };

    public logIn = async (request: Request, response: Response): Promise<Response> => {
        const { userId, token } = await this._authService.logIn(request.body);

        return response.status(200).json({ userId, token });
    };
}

export default AuthController;
