const express = require('express');
const router = express.Router();
const { calculerRisque, getDashboard } = require('../controllers/riskController');

// GET /api/risk/dashboard
router.get('/dashboard', getDashboard);

// POST /api/risk/calculate
router.post('/calculate', calculerRisque);

module.exports = router;
