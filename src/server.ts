import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';

import config from './config';
import api from './api';
import logger from './helpers/logger';

const startServer = (): void => {
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
