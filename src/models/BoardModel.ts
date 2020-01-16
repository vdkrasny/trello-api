import { Service } from 'typedi';

import { Model, ModelItem } from './Model';

export interface Board extends ModelItem {
    name: string;
    color: string;
    description: string;
}

@Service()
export class BoardModel extends Model<Board> {
    constructor() {
        super('boards');
    }
}

export default BoardModel;
