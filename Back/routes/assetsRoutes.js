const express = require('express');
const router = express.Router();
const {
  getAllAssets,
  createAsset,
  updateAsset,
  deleteAsset
} = require('../controllers/assetsController');

// GET /api/assets
router.get('/', getAllAssets);

// POST /api/assets
router.post('/', createAsset);

// PUT /api/assets/:id
router.put('/:id', updateAsset);

// DELETE /api/assets/:id
router.delete('/:id', deleteAsset);

module.exports = router;