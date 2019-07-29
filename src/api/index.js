const express = require('express');

const authVerify = require('./middlewares/authVerify');
const authRoutes = require('./routes/authRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.all('*', authVerify);

module.exports = router;
