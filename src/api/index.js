const express = require('express');

const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');
const cardsRoutes = require('./routes/cardRoutes');
const middlewares = require('./middlewares');

const router = express.Router();

router.use('/auth', authRoutes);
router.all('*', middlewares.verifyAuth);
router.use('*', middlewares.logger);
router.use('/boards', boardRoutes);
router.use('/cards', cardsRoutes);
router.use(middlewares.notFound);
router.use(middlewares.errorHandler);

module.exports = router;
