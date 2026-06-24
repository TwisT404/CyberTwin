const express = require('express');
const router = express.Router();
const {
  getAllVulnerabilities,
  createVulnerabilities,
  updateVulnerabilities,
  deleteVulnerabilities
} = require('../controllers/vulnerabilitiesController');

// GET /api/vulnerabilities
router.get('/', getAllVulnerabilities);

// POST /api/vulnerabilities
router.post('/', createVulnerabilities);

// PUT /api/vulnerabilities/:id
router.put('/:id', updateVulnerabilities);

// DELETE /api/vulnerabilities/:id
router.delete('/:id', deleteVulnerabilities);

module.exports = router;