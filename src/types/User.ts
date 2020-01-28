import { ModelItem } from './ModelItem';

export interface User extends ModelItem {
    login: string;
    password: string;
    role: string;
}
