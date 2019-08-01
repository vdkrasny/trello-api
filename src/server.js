const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const config = require('./config');
const api = require('./api');
const logger = require('./helpers/logger');

const startServer = () => {
    const app = express();

    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(config.api.prefix, api);

    app.listen(config.port, (error) => {
        if (error) {
            logger.log('error', error);
            process.exit(1);
        }

        logger.log('info', `Server running on port ${config.port}!`);
    });
};

startServer();
