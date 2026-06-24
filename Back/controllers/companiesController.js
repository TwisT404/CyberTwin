const Company = require('../models/assets.js');
const db = require('../config/database.js');

// GET /api/companies
const getAllCompanies = (req, res) => {
  db.query('SELECT * FROM companies', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// POST /api/companies
const createCompany = (req, res) => {
  const { name, sector, employees, servers, client_stations, exposed_services } = req.body;
  const newCompany = new Company(
    companies.length + 1,
    name,
    sector,
    employees,
    servers,
    client_stations,
    exposed_services
  );
  db.query('INSERT INTO companies SET ?', newCompany, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, ...newCompany });
  });
};

// PUT /api/companies/:id
const updateCompany = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, sector, employees, servers, client_stations, exposed_services } = req.body;
  db.query('UPDATE companies SET ? WHERE id = ?', [newCompany, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id, ...newCompany });
  });
};

// DELETE /api/companies/:id
const deleteCompany = (req, res) => {
  const id = parseInt(req.params.id);
  db.query('DELETE FROM companies WHERE id = ?', [id], (err, result) => {
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