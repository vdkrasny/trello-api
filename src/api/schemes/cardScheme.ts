import { object, string, array } from '@hapi/joi';

import { Card } from '../../types/Card';
import { CardStatus } from '../../enums/CardStatus';

export const cardScheme = object<Card>({
    name: string().required(),
    description: string().required(),
    estimate: string().required(),
    status: string()
        .valid(CardStatus.ToDo, CardStatus.InProgress, CardStatus.Done)
        .required(),
    dueDate: string().required(),
    labels: array()
        .items(string())
        .required(),
});

export default cardScheme;
