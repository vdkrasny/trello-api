const express = require('express');

const authVerify = require('./middlewares/authVerify');
const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.all('*', authVerify);
router.use('/boards', boardRoutes);

module.exports = router;
