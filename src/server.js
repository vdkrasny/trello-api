const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const config = require('./config');
const routes = require('./routes');
const { logger, errorHandler } = require('./middlewares');

const startServer = () => {
    const app = express();

    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(config.api.prefix, routes);
    app.use(errorHandler);

    app.listen(config.port, (error) => {
        if (error) {
            logger.error(error);
            process.exit(1);
        }

        logger.info(`Server running on port ${config.port}!`);
    });
};

startServer();
