import { Service } from 'typedi';

import { Card } from '../types/Card';
import { Model } from './Model';

@Service()
export class CardModel extends Model<Card> {
    constructor() {
        super('cards');
    }
}

export default CardModel;
