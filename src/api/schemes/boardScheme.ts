import { object, string } from '@hapi/joi';

import { Board } from '../../types/Board';

export const boardScheme = object<Board>({
    name: string().required(),
    color: string()
        .max(9)
        .required(),
    description: string().required(),
});

export default boardScheme;
