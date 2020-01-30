import { ModelItem } from './ModelItem';
import { CardStatus } from '../enums/CardStatus';

export interface Card extends ModelItem {
    name: string;
    description: string;
    estimate: string;
    status: CardStatus;
    dueDate: string;
    labels: string[];
}
