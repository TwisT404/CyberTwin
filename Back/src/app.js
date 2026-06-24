const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/companies', require('./routes/companiesRoutes'));
app.use('/api/assets', require('./routes/assetsRoutes'));
app.use('/api/vulnerabilities', require('./routes/vulnerabilitiesRoutes'));

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

module.exports = app;