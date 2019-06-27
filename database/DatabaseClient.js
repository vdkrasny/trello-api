const fs = require('fs');
const path = require('path');

class DatabaseClient {
    constructor(fileName) {
        this.filePath = path.join(__dirname, `${fileName}.json`);
    }

    read() {
        return new Promise(async (resolve, reject) => {
            const isFileExist = await this._isFileExist();

            if (!isFileExist) {
                await this.write([]);
            }

            fs.readFile(this.filePath, (err, json) => {
                if (err) {
                    return reject(err);
                }

                try {
                    const parsedJson = JSON.parse(json);

                    return resolve(parsedJson);
                } catch (error) {
                    return reject(new Error('Seems like the collection has been damaged. A data was not read.'));
                }
            });
        });
    }

    write(json) {
        return new Promise((resolve, reject) => {
            try {
                const convertedJson = JSON.stringify(json);

                fs.writeFile(this.filePath, convertedJson, (err) => {
                    if (err) {
                        return reject(err);
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
            fs.stat(this.filePath, (err) => {
                if (err === null) {
                    return resolve(true);
                }

                if (err.code === 'ENOENT') {
                    return resolve(false);
                }

                return reject(err);
            });
        });
    }
}

module.exports = DatabaseClient;
