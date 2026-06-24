const Vunerabilites = require('../models/vulnerabilites.js');
const db = require('../config/database.js');

// GET /api/vulnerabilites
const getAllVulnerabilites = (req, res) => {
  db.query('SELECT * FROM vulnerabilites', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// POST /api/vulnerabilites
const createVulnerabilites = (req, res) => {
  const { vulnerabilite_nom, description, gravite } = req.body;
  const sql = 'INSERT INTO vulnerabilites (vulnerabilite_nom, description, gravite) VALUES (?,?,?)';
  const params = [vulnerabilite_nom, description, gravite];
  db.query(sql, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId});
  });
};

// PUT /api/vulnerabilites/:id
const updateVulnerabilites = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, severity } = req.body;
  db.query('UPDATE vulnerabilites SET ? WHERE id = ?', [req.body, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id, ...req.body });
  });
};

// DELETE /api/vulnerabilites/:id
const deleteVulnerabilites = (req, res) => {
  const id = parseInt(req.params.id);
  db.query('DELETE FROM vulnerabilites WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).end();
  });
};

module.exports = {
  getAllVulnerabilites,
  createVulnerabilites,
  updateVulnerabilites,
  deleteVulnerabilites
};