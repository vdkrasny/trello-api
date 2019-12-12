import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import AuthenticationError from '../errors/AuthenticationError';
import config from '../config';

class AuthService {
    constructor(container) {
        this.userModel = container.get('userModel');
    }

    async signUp({ login, password } = {}) {
        const foundUser = await this.userModel.findOne({ login });

        if (foundUser) {
            throw new AuthenticationError('This login is already registered.');
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await this.userModel.create({
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

    async logIn({ login, password } = {}) {
        const foundUser = (await this.userModel.findOne({ login })) || {};
        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password || '');

        if (!isPasswordCorrect) {
            throw new AuthenticationError('Username or password is incorrect.');
        }

        const token = this._generateToken(foundUser);

        return {
            userId: foundUser.id,
            token,
        };
    }

    _generateToken({ id, login, role } = {}) {
        return jwt.sign({ id, login, role }, config.jwt.secret, { expiresIn: config.jwt.expiresIn });
    }
}

export default AuthService;
