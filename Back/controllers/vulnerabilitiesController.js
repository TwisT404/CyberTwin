const Vunerability = require('../models/vulnerabilities.js');
const db = require('../config/database.js');

// GET /api/vulnerabilities
const getAllVulnerabilities = (req, res) => {
  db.query('SELECT * FROM vulnerabilities', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// POST /api/vulnerabilities
const createVulnerabilities = (req, res) => {
  const { name, description, severity } = req.body;
  const newVulnerability = new Vunerability(
    vulnerabilities.length + 1,
    name,
    description,
    severity
  );
  db.query('INSERT INTO vulnerabilities SET ?', newVulnerability, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, ...newVulnerability });
  });
};

// PUT /api/vulnerabilities/:id
const updateVulnerabilities = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description, severity } = req.body;
  db.query('UPDATE vulnerabilities SET ? WHERE id = ?', [req.body, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id, ...req.body });
  });
};

// DELETE /api/vulnerabilities/:id
const deleteVulnerabilities = (req, res) => {
  const id = parseInt(req.params.id);
  db.query('DELETE FROM vulnerabilities WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).end();
  });
};

module.exports = {
  getAllVulnerabilities,
  createVulnerabilities,
  updateVulnerabilities,
  deleteVulnerabilities
};