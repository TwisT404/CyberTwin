const express = require('express');
const router = express.Router();
const {
  getAllActifs,
  getActifById,
  getActifsByEntreprise,
  createActif,
  updateActif,
  deleteActif
} = require('../controllers/actifsController');

// GET /api/actifs
router.get('/', getAllActifs);

// GET /api/actifs/entreprise/:entreprise_id (déclaré avant /:id pour éviter le conflit de route)
router.get('/entreprise/:entreprise_id', getActifsByEntreprise);

// GET /api/actifs/:id
router.get('/:id', getActifById);

// POST /api/actifs
router.post('/', createActif);

// PUT /api/actifs/:id
router.put('/:id', updateActif);

// DELETE /api/actifs/:id
router.delete('/:id', deleteActif);

module.exports = router;