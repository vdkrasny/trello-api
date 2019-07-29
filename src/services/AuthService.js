const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/UserModel');
const config = require('../config');

class AuthService {
    constructor(userModel) {
        this.userModel = userModel || new UserModel();
    }

    async signUp({ login, password } = {}) {
        try {
            const foundUser = await this.userModel.findOne({ login });

            if (foundUser) throw new Error('This login is already registered.');

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
        } catch (error) {
            throw error;
        }
    }

    async signIn({ login, password } = {}) {
        try {
            const foundUser = await this.userModel.findOne({ login });

            if (!foundUser) throw new Error('Username or password is incorrect.');

            const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

            if (!isPasswordCorrect) throw new Error('Username or password is incorrect.');

            const token = this._generateToken(foundUser);

            return {
                user: {
                    login: foundUser.login,
                    role: foundUser.role
                },
                token
            };
        } catch (error) {
            throw error;
        }
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