import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Service, Inject } from 'typedi';

import { UserModel, User } from '../models/UserModel';
import AuthenticationError from '../errors/AuthenticationError';
import config from '../config';

export interface AuthCredentials {
    login: string;
    password: string;
}

export interface SuccessAuthData {
    userId: string;
    token: string;
}

@Service()
export class AuthService {
    @Inject()
    private _userModel!: UserModel;

    public async signUp({ login, password }: AuthCredentials): Promise<SuccessAuthData> {
        const foundUser = await this._userModel.findOne({ login });

        if (foundUser) {
            throw new AuthenticationError('This login is already registered.');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await this._userModel.create({
            login,
            password: hashedPassword,
            role: 'user',
        });
        const token = this._generateToken(newUser);

        return {
            userId: newUser.id,
            token,
        };
    }

    public async logIn({ login, password }: AuthCredentials): Promise<SuccessAuthData> {
        const authenticationErrorMessage = 'Username or password is incorrect.';
        const foundUser = await this._userModel.findOne({ login });

        if (!foundUser) {
            throw new AuthenticationError(authenticationErrorMessage);
        }

        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

        if (!isPasswordCorrect) {
            throw new AuthenticationError(authenticationErrorMessage);
        }

        const token = this._generateToken(foundUser);

        return {
            userId: foundUser.id,
            token,
        };
    }

    private _generateToken({ id, login, role }: User): string {
        return jwt.sign({ id, login, role }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
    }
}

export default AuthService;
