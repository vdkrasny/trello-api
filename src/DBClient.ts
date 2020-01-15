import fs from 'fs';
import path from 'path';

export class DBClient<T extends object> {
    private _filePath: string;

    constructor(public fileName: string) {
        this._filePath = path.join(__dirname, '..', 'database', `${fileName}.json`);
    }

    public async getCollection(): Promise<T[]> {
        const isFileExist = await this._isFileExist();

        if (!isFileExist) {
            await this.saveCollection([]);
        }

        return new Promise<T[]>((resolve, reject) => {
            fs.readFile(this._filePath, (readingFileError, rawCollection) => {
                if (readingFileError) {
                    return reject(readingFileError);
                }

                try {
                    const collection = rawCollection.toString('binary');
                    const parsedCollection: T[] = JSON.parse(collection);

                    if (!Array.isArray(parsedCollection)) {
                        throw new Error('The format of the stored data is not an array.');
                    }

                    return resolve(parsedCollection);
                } catch (error) {
                    return reject(
                        new Error(`The requested collection ${this._filePath} has not been read. ${error.message}`)
                    );
                }
            });
        });
    }

    public saveCollection(collection: T[]): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                const convertedCollection = JSON.stringify(collection);

                return fs.writeFile(this._filePath, convertedCollection, writingFileError => {
                    if (writingFileError) {
                        return reject(writingFileError);
                    }

                    return resolve();
                });
            } catch (error) {
                return reject(
                    new Error(`The requested collection ${this._filePath} has not been saved. ${error.message}`)
                );
            }
        });
    }

    private _isFileExist(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            fs.stat(this._filePath, error => {
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
