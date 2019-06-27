const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const routes = require('./src/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', routes);
app.listen(port, () => console.log(`App running on port ${port}!`));
