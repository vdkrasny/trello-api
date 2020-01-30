import { ModelItem } from './ModelItem';

export interface Board extends ModelItem {
    name: string;
    color: string;
    description: string;
}
