const express = require('express');

const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');
const cardsRoutes = require('./routes/cardRoutes');
const middlewares = require('./middlewares');

const router = express.Router();

router.use(middlewares.requestDetails);
router.use(middlewares.logActivity);
router.use('/auth', authRoutes);
router.use(middlewares.checkAuthentication);
router.use('/boards', boardRoutes);
router.use('/cards', cardsRoutes);
router.use(middlewares.notFound);
router.use(middlewares.logErrors);
router.use(middlewares.errorHandler);

module.exports = router;
