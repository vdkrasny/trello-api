const express = require('express');
const authRoutes = require('./authRoutes');
const boardsRoutes = require('./boardsRoutes');
const cardsRoutes = require('./cardsRoutes');
const { authVerify } = require('../middlewares');

const router = express.Router();

router.all('*', authVerify);
router.use('/', authRoutes);
router.use('/boards', boardsRoutes);
router.use('/cards', cardsRoutes);

module.exports = router;
