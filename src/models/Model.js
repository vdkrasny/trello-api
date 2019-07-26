const CollectionClient = require('../../database/CollectionClient');

class Model extends CollectionClient {
    async findAll() {
        const collection = await this.getCollection();

        return collection;
    }

    async findById(id) {
        const collection = await this.getCollection();
        const foundItem = collection.find(({ id: itemId }) => itemId === String(id));

        if (!foundItem) {
            return undefined;
        }

        return foundItem;
    }

    async findByIdAndUpdate(id, body = {}) {
        const collection = await this.getCollection();
        const foundItemIndex = collection.findIndex(({ id: itemId }) => itemId === String(id));

        if (foundItemIndex === -1) {
            return undefined;
        }

        const foundItem = collection[foundItemIndex];
        const updatedItem = {
            ...foundItem,
            ...body
        };

        collection[foundItemIndex] = updatedItem;
        await this.saveCollection(collection);

        return updatedItem;
    }

    async findByIdAndDelete(id) {
        const collection = await this.getCollection();
        const foundItemIndex = collection.findIndex(({ id: itemId }) => itemId === String(id));

        if (foundItemIndex === -1) {
            return undefined;
        }

        const deletedItems = collection.splice(foundItemIndex, 1);
        await this.saveCollection(collection);

        return deletedItems[0];
    }

    async create(body = {}) {
        const collection = await this.getCollection();
        const randomId = Math.random()
            .toString(36)
            .substr(2, 9);
        const createdItem = { ...body, id: randomId };

        collection.push(createdItem);
        await this.saveCollection(collection);

        return createdItem;
    }
}

module.exports = Model;
