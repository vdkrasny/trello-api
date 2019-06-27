const DatabaseClient = require('../../database/DatabaseClient');

class Users {
    constructor(collectionName) {
        this._collectionClient = new DatabaseClient(collectionName);
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

module.exports = new Users('users');
