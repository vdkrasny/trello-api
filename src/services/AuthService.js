const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthorizationError = require('../errors/AuthorizationError');
const config = require('../config');

class AuthService {
    constructor(container) {
        this.userModel = container.get('userModel');
    }

    async signUp({ login, password } = {}) {
        const foundUser = await this.userModel.findOne({ login });

        if (foundUser) {
            throw new AuthorizationError('This login is already registered.');
        }

        const hashedPassword = await bcrypt.hash(password, config.hashSalt);

        const newUser = await this.userModel.create({
            login,
            password: hashedPassword,
            role: 'user'
        });
        const token = this._generateToken(newUser);

        return {
            user: {
                login: newUser.login,
                role: newUser.role
            },
            token
        };
    }

    async logIn({ login, password } = {}) {
        const foundUser = await this.userModel.findOne({ login });

        if (!foundUser) {
            throw new AuthorizationError('Username or password is incorrect.');
        }

        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

        if (!isPasswordCorrect) {
            throw new AuthorizationError('Username or password is incorrect.');
        }

        const token = this._generateToken(foundUser);

        return {
            user: {
                login: foundUser.login,
                role: foundUser.role
            },
            token
        };
    }

    _generateToken({ id, login, role } = {}) {
        return jwt.sign(
            { id, login, role },
            config.jwt.secret,
            { expiresIn: config.jwt.expiresIn }
        );
    }
}

module.exports = AuthService;
