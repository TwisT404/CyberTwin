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

// GET /api/actifs/:id
const getActifById = (req, res) => {
  const id = parseInt(req.params.id);
  db.query('SELECT * FROM actifs WHERE actif_id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!results.length) {
      return res.status(404).json({ error: 'Actif introuvable' });
    }
    res.json(results[0]);
  });
};

// GET /api/actifs/entreprise/:entreprise_id
// Liste les actifs appartenant à une entreprise donnée
const getActifsByEntreprise = (req, res) => {
  const entreprise_id = parseInt(req.params.entreprise_id);
  db.query('SELECT * FROM actifs WHERE entreprise_id = ?', [entreprise_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// POST /api/actifs
const createActif = (req, res) => {
  const { actif_nom, type, criticite, est_expose_internet, entreprise_id} = req.body;
  const sql = 'INSERT INTO actifs (actif_nom, type, criticite, est_expose_internet, entreprise_id) VALUES (?,?,?,?,?)';
  const params = [actif_nom, type, criticite, est_expose_internet, entreprise_id];
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
  const { actif_nom, type, criticite, est_expose_internet, entreprise_id } = req.body;
  const sql = 'UPDATE actifs SET actif_nom = ?, type = ?, criticite = ?, est_expose_internet = ?, entreprise_id = ? WHERE actif_id = ?';
  const params = [actif_nom, type, criticite, est_expose_internet, entreprise_id, id];

  db.query(sql, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ actif_id: id, actif_nom, type, criticite, est_expose_internet, entreprise_id });
  });
};

// DELETE /api/actifs/:id
const deleteActif = (req, res) => {
  const id = parseInt(req.params.id);
  db.query('DELETE FROM actifs WHERE actif_id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).end();
  });
};

module.exports = {
  getAllActifs,
  getActifById,
  getActifsByEntreprise,
  createActif,
  updateActif,
  deleteActif
};