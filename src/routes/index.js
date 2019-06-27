const express = require('express');
const authRoutes = require('./authRoutes');
const boardsRoutes = require('./boardsRoutes');

const router = express.Router();

router.use('/', authRoutes);
router.use('/boards', boardsRoutes);

module.exports = router;
