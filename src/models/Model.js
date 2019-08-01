const CollectionClient = require('../../database/CollectionClient');

class Model extends CollectionClient {
    async getAll() {
        const collection = await this.getCollection();

        return collection;
    }

    async find(conditions = {}) {
        const conditionsKeys = Object.keys(conditions);

        if (!conditionsKeys.length) {
            throw new Error('At list one search condition was expected, but it was not specified.');
        }

        const collection = await this.getCollection();
        const firstConditionsKey = conditionsKeys[0];
        const restConditionsKeys = conditionsKeys.slice(1);
        let foundItems;

        foundItems = collection.filter(collectionItem => collectionItem[firstConditionsKey] === conditions[firstConditionsKey]);

        if (!foundItems.length) {
            return null;
        }

        if (!restConditionsKeys.length) {
            return foundItems;
        }

        restConditionsKeys.forEach((key) => {
            foundItems = foundItems.filter(foundItem => foundItem[key] === conditions[key]);
        });

        if (!foundItems.length) {
            return null;
        }

        return foundItems;
    }

    async findOne(conditions = {}) {
        const foundItems = await this.find(conditions);

        if (!foundItems) {
            return null;
        }

        const firstFoundItem = foundItems[0];

        return firstFoundItem;
    }

    async findById(id) {
        const collection = await this.getCollection();
        const foundItem = collection.find(({ id: itemId }) => itemId === id);

        if (!foundItem) {
            return null;
        }

        return foundItem;
    }

    async findByIdAndUpdate(id, body = {}) {
        const collection = await this.getCollection();
        const foundItemIndex = collection.findIndex(({ id: itemId }) => itemId === id);

        if (foundItemIndex === -1) {
            return null;
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
        const foundItemIndex = collection.findIndex(({ id: itemId }) => itemId === id);

        if (foundItemIndex === -1) {
            return null;
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
        const createdItem = {
            ...body,
            createdAt: new Date(),
            id: randomId
        };

        collection.push(createdItem);
        await this.saveCollection(collection);

        return createdItem;
    }
}

module.exports = Model;
