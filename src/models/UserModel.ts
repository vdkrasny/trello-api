import { Model, ModelItem } from './Model';

export interface User extends ModelItem {
    login: string;
    password: string;
    role: string;
}

export class UserModel extends Model<User> {
    constructor() {
        super('users');
    }
}

export default UserModel;
