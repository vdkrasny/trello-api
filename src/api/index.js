const express = require('express');

const authVerify = require('./middlewares/authVerify');
const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');
const cardsRoutes = require('./routes/cardRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.all('*', authVerify);
router.use('/boards', boardRoutes);
router.use('/cards', cardsRoutes);

module.exports = router;
