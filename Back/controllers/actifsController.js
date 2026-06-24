const Actif = require('../models/actifs.js');
const db = require('../config/database.js');

// GET /api/actifs
const getAllActifs = (req, res) => {
  db.query('SELECT * FROM actifs', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// POST /api/actifs
const createActif = (req, res) => {
  const { actif_nom, type, criticite, vulnerabilites, est_expose_internet} = req.body;
  const sql = 'INSERT INTO actifs (actif_nom, type, criticite, vulnerabilites, est_expose_internet) VALUES (?,?,?,?,?)';
  const params = [actif_nom, type, criticite, vulnerabilites, est_expose_internet];
  db.query(sql, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId});
  });
};

// PUT /api/actifs/:id
const updateActif = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, type, criticality, vulnerabilities, isExposedToInternet } = req.body;
  db.query('UPDATE actifs SET ? WHERE id = ?', [req.body, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id, ...req.body });
  });
};

// DELETE /api/actifs/:id
const deleteActif = (req, res) => {
  const id = parseInt(req.params.id);
  db.query('DELETE FROM actifs WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).end();
  });
};

module.exports = {
  getAllActifs,
  createActif,
  updateActif,
  deleteActif
};