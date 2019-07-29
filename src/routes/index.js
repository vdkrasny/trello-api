const express = require('express');
const cardsRoutes = require('./cardsRoutes');

const router = express.Router();

router.use('/cards', cardsRoutes);

module.exports = router;
