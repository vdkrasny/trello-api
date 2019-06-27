const bcrypt = require('bcrypt');
const Users = require('../models/Users');

class AuthController {
    async signup(request, response, next) {
        const {
            body: { login, password },
            user: requestUser
        } = request;

        if (requestUser) {
            throw new Error('You are already logged in.');
        }

        if (login && password) {
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = {
                login,
                password: hashedPassword,
                role: 'user'
            };

            await Users.create(newUser);

            response
                .status(200)
                .end();
        }
    }
}

module.exports = new AuthController();
