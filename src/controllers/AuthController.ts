import { Request, Response } from 'express';
import { Service, Inject } from 'typedi';

import { AuthService } from '../services/AuthService';

@Service()
export class AuthController {
    @Inject()
    private _authService!: AuthService;

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
