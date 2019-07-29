const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const config = require('./config');
const api = require('./api');

const startServer = () => {
    const app = express();

    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(config.api.prefix, api);

    app.listen(config.port, (error) => {
        if (error) process.exit(1);
    });
};

startServer();
