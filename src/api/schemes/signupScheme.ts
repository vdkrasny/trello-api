import { object, string } from '@hapi/joi';

import { User } from '../../types/User';

export const signupScheme = object<User>({
    login: string()
        .min(5)
        .max(50)
        .required(),
    password: string()
        .min(5)
        .required(),
});

export default signupScheme;
