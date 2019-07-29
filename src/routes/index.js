const express = require('express');
const boardsRoutes = require('./boardsRoutes');
const cardsRoutes = require('./cardsRoutes');

const router = express.Router();

router.use('/boards', boardsRoutes);
router.use('/cards', cardsRoutes);

module.exports = router;
