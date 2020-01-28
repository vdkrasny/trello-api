import { ModelItem } from './ModelItem';
import { UserRoles } from '../enums/UserRoles';

export interface User extends ModelItem {
    login: string;
    password: string;
    role: UserRoles;
}
