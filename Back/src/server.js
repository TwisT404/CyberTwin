const app = require('./app');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const assetsRoutes = require('./routes/assetsRoutes');
const companiesRoutes = require('./routes/companiesRoutes');
const vulnerabilitiesRoutes = require('./routes/vulnerabilitiesRoutes');
app.use('/api/assets', assetsRoutes);
app.use('/api/companies', companiesRoutes);
app.use('/api/vulnerabilities', vulnerabilitiesRoutes);
app.listen(process.env.PORT, () => {
 console.log(`Serveur démarré sur le port ${process.env.PORT}`);
});
