const DatabaseClient = require('../../database/DatabaseClient');

class Collection {
    constructor(name) {
        this._collectionClient = new DatabaseClient(name);
    }

    async create(body = {}) {
        const collection = await this.getCollection();
        const randomId = Math.random()
            .toString(36)
            .substr(2, 9);
        const item = {
            ...body,
            id: randomId
        };

        collection.push(item);
        await this.saveCollection(collection);

        return item;
    }

    async findById(id) {
        const collection = await this.getCollection();
        const targetItem = collection.find(({ id: itemId }) => itemId === String(id));

        if (targetItem === -1) {
            return undefined;
        }

        return targetItem;
    }

    async findByIdAndUpdate(id, body = {}) {
        const collection = await this.getCollection();
        const targetItemIndex = collection.findIndex(({ id: itemId }) => itemId === String(id));

        if (targetItemIndex === -1) {
            return undefined;
        }

        const targetItem = collection[targetItemIndex];
        const updatedItem = {
            ...targetItem,
            ...body
        };

        collection[targetItemIndex] = updatedItem;
        await this.saveCollection(collection);

        return updatedItem;
    }

    async findByIdAndDelete(id) {
        const collection = await this.getCollection();
        const targetItemIndex = collection.findIndex(({ id: itemId }) => itemId === String(id));

        if (targetItemIndex === -1) {
            return undefined;
        }

        const deletedItems = collection.splice(targetItemIndex, 1);
        await this.saveCollection(collection);

        return deletedItems[0];
    }

    async saveCollection(collection) {
        await this._collectionClient.write(collection);

        return undefined;
    }

    async getCollection() {
        const collection = await this._collectionClient.read();

        return collection;
    }
}

module.exports = Collection;
