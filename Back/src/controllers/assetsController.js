const Asset = require('../models/assets.js');
const db = require('../config/database');

// GET /api/assets
const getAllAssets = (req, res) => {
  db.query('SELECT * FROM assets', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// POST /api/assets
const createAsset = (req, res) => {
  const { name, type, criticality, vulnerabilities, isExposedToInternet } = req.body;
  db.query('INSERT INTO assets SET ?', { name, type, criticality, vulnerabilities, isExposedToInternet }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// PUT /api/assets/:id
const updateAsset = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, type, criticality, vulnerabilities, isExposedToInternet } = req.body;
  db.query('UPDATE assets SET ? WHERE id = ?', [req.body, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id, ...req.body });
  });
};

// DELETE /api/assets/:id
const deleteAsset = (req, res) => {
  const id = parseInt(req.params.id);
  db.query('DELETE FROM assets WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).end();
  });
};

module.exports = {
  getAllAssets,
  createAsset,
  updateAsset,
  deleteAsset
};