const express = require('express');
const router = express.Router();
const {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
} = require('../controllers/companiesController');

// GET /api/companies
router.get('/', getAllCompanies);

// GET /api/companies/:id
router.get('/:id', getCompanyById);

// POST /api/companies
router.post('/', createCompany);

// PUT /api/companies/:id
router.put('/:id', updateCompany);

// DELETE /api/companies/:id
router.delete('/:id', deleteCompany);

module.exports = router;