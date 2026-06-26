const express = require('express');
const router = express.Router();
const {
  getAllVulnerabilites,
  getVulnerabiliteById,
  createVulnerabilites,
  updateVulnerabilites,
  deleteVulnerabilites,
  getVulnerabilitesByActif,
  getAllAssociations,
  associerVulnerabilite,
  dissocierVulnerabilite
} = require('../controllers/vulnerabilitesController');

// GET /api/vulnerabilities
router.get('/', getAllVulnerabilites);

// GET /api/vulnerabilities/associations (déclaré avant /:id pour éviter le conflit de route)
router.get('/associations', getAllAssociations);

// GET /api/vulnerabilities/actif/:actif_id (déclaré avant /:id pour éviter le conflit de route)
router.get('/actif/:actif_id', getVulnerabilitesByActif);

// POST /api/vulnerabilities/associer
router.post('/associer', associerVulnerabilite);

// DELETE /api/vulnerabilities/dissocier/:actif_id/:vulnerabilite_id
router.delete('/dissocier/:actif_id/:vulnerabilite_id', dissocierVulnerabilite);

// GET /api/vulnerabilities/:id
router.get('/:id', getVulnerabiliteById);

// POST /api/vulnerabilities
router.post('/', createVulnerabilites);

// PUT /api/vulnerabilities/:id
router.put('/:id', updateVulnerabilites);

// DELETE /api/vulnerabilities/:id
router.delete('/:id', deleteVulnerabilites);

module.exports = router;