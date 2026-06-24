const express = require('express');
const router = express.Router();
const { calculerRisque } = require('../controllers/riskController');

// POST /api/risk/calculate
router.post('/calculate', calculerRisque);

module.exports = router;
