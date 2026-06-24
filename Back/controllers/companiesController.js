const Company = require('../models/companies.js');
const db = require('../config/database.js');

// GET /api/companies
const getAllCompanies = (req, res) => {
  db.query('SELECT * FROM entreprises', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// POST /api/companies
const createCompany = (req, res) => {
  const { entreprise_nom, secteur, employes, serveurs, postes_clients, services_exposes } = req.body;

  // Fix column name typo: services_exposes in DB
  const sql = 'INSERT INTO entreprises (entreprise_nom, secteur, employes, serveurs, postes_clients, services_exposes) VALUES (?,?,?,?,?,?)';
  const params = [entreprise_nom, secteur, employes, serveurs, postes_clients, services_exposes];

  db.query(sql, params, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    // return created resource id
    res.status(201).json({ id: result.insertId });
  });
};

// PUT /api/companies/:id
const updateCompany = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, sector, employees, servers, client_stations, exposed_services } = req.body;
  db.query('UPDATE entreprises SET ? WHERE id = ?', [newCompany, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id, ...newCompany });
  });
};

// DELETE /api/companies/:id
const deleteCompany = (req, res) => {
  const id = parseInt(req.params.id);
  db.query('DELETE FROM entreprises WHERE id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(204).end();
  });
};

module.exports = {
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany
};