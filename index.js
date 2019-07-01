const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { logger, errorHandler } = require('./src/middlewares');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);
app.use('/api', routes);
app.use(errorHandler);
app.listen(port, () => console.log(`App running on port ${port}!`));
