const express = require('express');
const router = express.Router();
const {
  getAllActifs,
  createActif,
  updateActif,
  deleteActif
} = require('../controllers/actifsController');

// GET /api/actifs
router.get('/', getAllActifs);

// POST /api/actifs
router.post('/', createActif);

// PUT /api/actifs/:id
router.put('/:id', updateActif);

// DELETE /api/actifs/:id
router.delete('/:id', deleteActif);

module.exports = router;