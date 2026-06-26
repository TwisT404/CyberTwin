const Vunerabilites = require('../models/vulnerabilites.js');
const db = require('../config/database.js');

// GET /api/vulnerabilities
const getAllVulnerabilites = (req, res) => {
  db.query('SELECT * FROM vulnerabilites', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// GET /api/vulnerabilities/:id
const getVulnerabiliteById = (req, res) => {
  const id = parseInt(req.params.id);
  db.query('SELECT * FROM vulnerabilites WHERE vulnerabilite_id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!results.length) {
      return res.status(404).json({ error: 'Vulnérabilité introuvable' });
    }
    res.json(results[0]);
  });
};

// POST /api/vulnerabilities
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

// PUT /api/vulnerabilities/:id
const updateVulnerabilites = (req, res) => {
  const id = parseInt(req.params.id);
  const { vulnerabilite_nom, description, gravite } = req.body;
  const sql = 'UPDATE vulnerabilites SET vulnerabilite_nom = ?, description = ?, gravite = ? WHERE vulnerabilite_id = ?';
  const params = [vulnerabilite_nom, description, gravite, id];

  db.query(sql, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ vulnerabilite_id: id, vulnerabilite_nom, description, gravite });
  });
};

// DELETE /api/vulnerabilities/:id
const deleteVulnerabilites = (req, res) => {
  const id = parseInt(req.params.id);
  db.query('DELETE FROM vulnerabilites WHERE vulnerabilite_id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).end();
  });
};

// GET /api/vulnerabilities/actif/:actif_id
// Liste les vulnérabilités associées à un actif donné
const getVulnerabilitesByActif = (req, res) => {
  const actif_id = parseInt(req.params.actif_id);
  const sql = `
    SELECT v.* FROM vulnerabilites v
    JOIN actifs_entreprises ae ON ae.vulnerabilite_id = v.vulnerabilite_id
    WHERE ae.actif_id = ?
  `;
  db.query(sql, [actif_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// GET /api/vulnerabilities/associations
// Liste toutes les associations actif <-> vulnérabilité, enrichies avec le détail
// de l'actif, de la vulnérabilité et de l'entreprise concernée.
const getAllAssociations = (req, res) => {
  const sql = `
    SELECT
      ae.actif_id, ae.vulnerabilite_id, ae.entreprise_id,
      a.actif_nom, a.type AS actif_type, a.criticite AS actif_criticite,
      v.vulnerabilite_nom, v.description AS vulnerabilite_description, v.gravite,
      e.entreprise_nom
    FROM actifs_entreprises ae
    JOIN actifs a ON a.actif_id = ae.actif_id
    JOIN vulnerabilites v ON v.vulnerabilite_id = ae.vulnerabilite_id
    JOIN entreprises e ON e.entreprise_id = ae.entreprise_id
  `;
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// POST /api/vulnerabilities/associer
// Body : { actif_id, vulnerabilite_id, entreprise_id }
// Associe une vulnérabilité existante à un actif
const associerVulnerabilite = (req, res) => {
  const { actif_id, vulnerabilite_id, entreprise_id } = req.body;

  if (!actif_id || !vulnerabilite_id || !entreprise_id) {
    return res.status(400).json({ error: 'actif_id, vulnerabilite_id et entreprise_id sont requis' });
  }

  const sql = 'INSERT INTO actifs_entreprises (actif_id, vulnerabilite_id, entreprise_id) VALUES (?, ?, ?)';
  db.query(sql, [actif_id, vulnerabilite_id, entreprise_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ actif_id, vulnerabilite_id, entreprise_id });
  });
};

// DELETE /api/vulnerabilities/dissocier/:actif_id/:vulnerabilite_id
// Retire l'association entre un actif et une vulnérabilité
const dissocierVulnerabilite = (req, res) => {
  const actif_id = parseInt(req.params.actif_id);
  const vulnerabilite_id = parseInt(req.params.vulnerabilite_id);

  const sql = 'DELETE FROM actifs_entreprises WHERE actif_id = ? AND vulnerabilite_id = ?';
  db.query(sql, [actif_id, vulnerabilite_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).end();
  });
};

module.exports = {
  getAllVulnerabilites,
  getVulnerabiliteById,
  createVulnerabilites,
  updateVulnerabilites,
  deleteVulnerabilites,
  getVulnerabilitesByActif,
  getAllAssociations,
  associerVulnerabilite,
  dissocierVulnerabilite
};