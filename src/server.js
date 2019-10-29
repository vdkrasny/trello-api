const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const config = require('./config');
const api = require('./api');
const logger = require('./helpers/logger');

const startServer = () => {
    const server = express();

    server.use(helmet());
    server.use(cors({ optionsSuccessStatus: 200 }));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(config.api.prefix, api);

    server.listen(config.port, error => {
        if (error) {
            logger.log('error', error);
            process.exit(1);
        }

        logger.log('info', `Server running on port ${config.port}!`);
    });
};

startServer();
