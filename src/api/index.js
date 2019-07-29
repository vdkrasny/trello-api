const express = require('express');

const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');
const cardsRoutes = require('./routes/cardRoutes');
const { authVerify, errorHandler, notFound } = require('./middlewares');

const router = express.Router();

router.use('/auth', authRoutes);
router.all('*', authVerify);
router.use('/boards', boardRoutes);
router.use('/cards', cardsRoutes);
router.use(notFound);
router.use(errorHandler);

module.exports = router;
