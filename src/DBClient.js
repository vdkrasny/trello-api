const fs = require('fs');
const path = require('path');

class DBClient {
    constructor(fileName) {
        this.filePath = path.join(__dirname, '..', 'database', `${fileName}.json`);
    }

    async getCollection() {
        const isFileExist = await this._isFileExist();

        if (!isFileExist) {
            await this.write([]);
        }

        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, (error, json) => {
                if (error) {
                    return reject(error);
                }

                try {
                    const parsedJson = JSON.parse(json);

                    return resolve(parsedJson);
                } catch (err) {
                    throw new Error('Seems like the collection has been damaged. A data was not read.');
                }
            });
        });
    }

    saveCollection(json) {
        return new Promise((resolve, reject) => {
            try {
                const convertedJson = JSON.stringify(json);

                fs.writeFile(this.filePath, convertedJson, error => {
                    if (error) {
                        return reject(error);
                    }

                    return resolve();
                });
            } catch (err) {
                throw new Error('Seems like the collection has been damaged. A data was not saved.');
            }
        });
    }

    _isFileExist() {
        return new Promise((resolve, reject) => {
            fs.stat(this.filePath, error => {
                if (error === null) {
                    return resolve(true);
                }

                if (error.code === 'ENOENT') {
                    return resolve(false);
                }

                return reject(error);
            });
        });
    }
}

module.exports = DBClient;
