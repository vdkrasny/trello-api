import { ModelItem } from '../types/ModelItem';
import { DBClient } from '../DBClient';

export class Model<T extends ModelItem> extends DBClient<T> {
    public async getAll(): Promise<T[]> {
        const collection = await this.getCollection();

        return collection;
    }

    public async find(conditions: Partial<T>): Promise<T[] | null> {
        const conditionsKeys = Object.keys(conditions);

        if (!conditionsKeys.length) {
            throw new Error('At list one search condition was expected, but it was not specified.');
        }

        const collection = await this.getCollection();
        const [firstConditionsKey, ...restConditionsKeys] = conditionsKeys;
        let foundItems: T[];

        foundItems = collection.filter(
            collectionItem => collectionItem[firstConditionsKey] === conditions[firstConditionsKey]
        );

        if (!foundItems.length) {
            return null;
        }

        if (!restConditionsKeys.length) {
            return foundItems;
        }

        restConditionsKeys.forEach(conditionsKey => {
            foundItems = foundItems.filter(foundItem => foundItem[conditionsKey] === conditions[conditionsKey]);
        });

        if (!foundItems.length) {
            return null;
        }

        return foundItems;
    }

    public async findOne(conditions: Partial<T>): Promise<T | null> {
        const foundItems = await this.find(conditions);

        if (!foundItems) {
            return null;
        }

        const [firstFoundItem] = foundItems;

        return firstFoundItem;
    }

    public async findById(id: string): Promise<T | null> {
        const collection = await this.getCollection();
        const foundItem = collection.find(item => item.id === id);

        if (!foundItem) {
            return null;
        }

        return foundItem;
    }

    public async findByIdAndUpdate(id: string, body: Omit<T, keyof ModelItem>): Promise<T | null> {
        const collection = await this.getCollection();
        const foundItemIndex = collection.findIndex(item => item.id === id);

        if (foundItemIndex === -1) {
            return null;
        }

        const foundItem = collection[foundItemIndex];
        const updatedItem = {
            ...foundItem,
            ...body,
        };

        collection[foundItemIndex] = updatedItem;
        await this.saveCollection(collection);

        return updatedItem;
    }

    public async findByIdAndDelete(id: string): Promise<T | null> {
        const collection = await this.getCollection();
        const foundItemIndex = collection.findIndex(item => item.id === id);

        if (foundItemIndex === -1) {
            return null;
        }

        const [deletedItem] = collection.splice(foundItemIndex, 1);
        await this.saveCollection(collection);

        return deletedItem;
    }

    public async create(body: Omit<T, keyof ModelItem>): Promise<T> {
        const collection = await this.getCollection();
        const createdAt = new Date().toString();
        const id = this._generateRandomId();
        const createdItem = {
            ...body,
            createdAt,
            id,
        } as T;

        collection.push(createdItem);
        await this.saveCollection(collection);

        return createdItem;
    }

    private _generateRandomId(): string {
        return Math.random()
            .toString(36)
            .substr(2, 9);
    }
}

export default Model;
