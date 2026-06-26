require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API CyberTwin opérationnelle' });
});

app.use('/api/companies', require('./routes/companiesRoutes'));
app.use('/api/assets', require('./routes/assetsRoutes'));
app.use('/api/vulnerabilities', require('./routes/vulnerabilitiesRoutes'));
app.use('/api/risk', require('./routes/riskRoutes'));

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
 console.log(`Serveur démarré sur le port ${PORT}`);
});
