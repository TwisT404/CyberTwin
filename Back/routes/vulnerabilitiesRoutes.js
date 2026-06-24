const express = require('express');
const router = express.Router();
const {
  getAllVulnerabilites,
  createVulnerabilites,
  updateVulnerabilites,
  deleteVulnerabilites
} = require('../controllers/vulnerabilitesController');

// GET /api/vulnerabilities
router.get('/', getAllVulnerabilites);

// POST /api/vulnerabilities
router.post('/', createVulnerabilites);

// PUT /api/vulnerabilities/:id
router.put('/:id', updateVulnerabilites);

// DELETE /api/vulnerabilities/:id
router.delete('/:id', deleteVulnerabilites);

module.exports = router;