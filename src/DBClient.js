import fs from 'fs';
import path from 'path';

class DBClient {
    constructor(fileName) {
        this.filePath = path.join(__dirname, '..', 'database', `${fileName}.json`);
    }

    async getCollection() {
        const isFileExist = await this._isFileExist();

        if (!isFileExist) {
            await this.saveCollection([]);
        }

        return new Promise((resolve, reject) => {
            fs.readFile(this.filePath, (readingFileError, rawCollection) => {
                if (readingFileError) {
                    return reject(readingFileError);
                }

                try {
                    const collection = rawCollection.toString('binary');
                    const parsedCollection = JSON.parse(collection);

                    if (!Array.isArray(parsedCollection)) {
                        throw new Error('The format of the stored data is not an array.');
                    }

                    return resolve(parsedCollection);
                } catch (error) {
                    return reject(
                        new Error(`The requested collection ${this.filePath} has not been read. ${error.message}`)
                    );
                }
            });
        });
    }

    saveCollection(collection) {
        return new Promise((resolve, reject) => {
            try {
                const convertedCollection = JSON.stringify(collection);

                return fs.writeFile(this.filePath, convertedCollection, writingFileError => {
                    if (writingFileError) {
                        return reject(writingFileError);
                    }

                    return resolve();
                });
            } catch (error) {
                return reject(
                    new Error(`The requested collection ${this.filePath} has not been saved. ${error.message}`)
                );
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

export default DBClient;
