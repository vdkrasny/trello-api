import { Service } from 'typedi';

import { User } from '../types/User';
import { Model } from './Model';

@Service()
export class UserModel extends Model<User> {
    constructor() {
        super('users');
    }
}

export default UserModel;
