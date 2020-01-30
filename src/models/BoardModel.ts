import { Service } from 'typedi';

import { Board } from '../types/Board';
import { Model } from './Model';

@Service()
export class BoardModel extends Model<Board> {
    constructor() {
        super('boards');
    }
}

export default BoardModel;
