import { ModelItem } from './ModelItem';

export interface Card extends ModelItem {
    name: string;
    description: string;
    estimate: string;
    status: string;
    dueDate: string;
    labels: string[];
}
