const Risk = require('../models/risk.js');
const db = require('../config/database.js');

const getCriticitScore = (criticite) => {
  const scores = {
    'critique': 100,
    'élevée': 75,
    'elevee': 75,
    'moyenne': 50,
    'faible': 25
  };
  return scores[criticite?.toLowerCase()] || 0;
};

const getGraviteScore = (gravite) => {
  const scores = {
    'critique': 100,
    'élevée': 85,
    'elevee': 85,
    'haute': 80,
    'moyenne': 50,
    'faible': 20,
    'info': 5
  };
  return scores[gravite?.toLowerCase()] || 0;
};

// Calcule le score à partir d'actifs enrichis (actif.vulnerabilites = tableau d'objets {vulnerabilite_id, gravite, ...})
const calculerScores = (actifs) => {
  let scoresActifs = [];
  let detailsParActif = [];

  actifs.forEach(actif => {
    const vulnAssociees = actif.vulnerabilites || [];

    const scoreEntite = getCriticitScore(actif.criticite);
    const scoreVulnMoyen = vulnAssociees.length > 0
      ? vulnAssociees.reduce((acc, v) => acc + getGraviteScore(v.gravite), 0) / vulnAssociees.length
      : 0;

    const facteurExposition = actif.est_expose_internet ? 1.5 : 1.0;
    const scoreActif = Math.min((scoreEntite * 0.4 + scoreVulnMoyen * 0.6) * facteurExposition, 100);

    scoresActifs.push(scoreActif);
    detailsParActif.push({
      actif_id: actif.actif_id,
      actif_nom: actif.actif_nom,
      type: actif.type,
      criticite: actif.criticite,
      score_risque: parseFloat(scoreActif.toFixed(2)),
      nombre_vulnerabilites: vulnAssociees.length,
      vulnerabilites: vulnAssociees,
      expose_internet: !!actif.est_expose_internet
    });
  });

  const scoreGlobal = scoresActifs.length
    ? scoresActifs.reduce((a, b) => a + b, 0) / scoresActifs.length
    : 0;

  const niveauRisque = scoreGlobal >= 80 ? 'Critique'
                     : scoreGlobal >= 60 ? 'Élevé'
                     : scoreGlobal >= 40 ? 'Moyen'
                     : 'Faible';

  return { scoreGlobal, niveauRisque, detailsParActif };
};

// Charge les actifs d'une entreprise avec leurs vulnérabilités associées
const chargerActifsAvecVulnerabilites = (entreprise_id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM actifs WHERE entreprise_id = ?', [entreprise_id], (err, actifs) => {
      if (err) return reject(err);
      if (!actifs.length) return resolve([]);

      const sql = `
        SELECT ae.actif_id, v.vulnerabilite_id, v.vulnerabilite_nom, v.description, v.gravite
        FROM actifs_entreprises ae
        JOIN vulnerabilites v ON v.vulnerabilite_id = ae.vulnerabilite_id
        WHERE ae.entreprise_id = ?
      `;
      db.query(sql, [entreprise_id], (err2, liens) => {
        if (err2) return reject(err2);

        const actifsEnrichis = actifs.map(actif => ({
          ...actif,
          vulnerabilites: liens.filter(l => l.actif_id === actif.actif_id)
        }));

        resolve(actifsEnrichis);
      });
    });
  });
};

// POST /api/risk/calculate
// Body attendu : { entreprise_id }
// (mode avancé, toujours supporté : { entreprise_id, actifs: [...], vulnerabilites: [...] })
exports.calculerRisque = async (req, res) => {
  try {
    const { entreprise_id, actifs, vulnerabilites } = req.body;

    if (!entreprise_id) {
      return res.status(400).json({ erreur: 'Données invalides : entreprise_id requis' });
    }

    let actifsAUtiliser;

    if (Array.isArray(actifs) && actifs.length) {
      // Mode avancé : on reconstruit actif.vulnerabilites à partir de la liste fournie
      const vulnsFournies = Array.isArray(vulnerabilites) ? vulnerabilites : [];
      actifsAUtiliser = actifs.map(actif => ({
        ...actif,
        vulnerabilites: vulnsFournies.filter(v => actif.vulnerabilites?.includes(v.vulnerabilite_id))
      }));
    } else {
      // Mode simple : on charge tout depuis la base de données
      actifsAUtiliser = await chargerActifsAvecVulnerabilites(entreprise_id);
    }

    if (!actifsAUtiliser.length) {
      return res.status(404).json({ erreur: 'Aucun actif trouvé pour cette entreprise' });
    }

    const { scoreGlobal, niveauRisque, detailsParActif } = calculerScores(actifsAUtiliser);

    const nombreVulnerabilites = detailsParActif.reduce((acc, a) => acc + a.nombre_vulnerabilites, 0);

    const resultat = new Risk(
      entreprise_id,
      actifsAUtiliser.length,
      nombreVulnerabilites,
      parseFloat(scoreGlobal.toFixed(2)),
      niveauRisque,
      { details_par_actif: detailsParActif }
    );

    res.status(200).json({ succes: true, donnees: resultat });
  } catch (erreur) {
    console.error('Erreur:', erreur);
    res.status(500).json({ erreur: 'Erreur lors du calcul du risque' });
  }
};

// GET /api/risk/dashboard
// Statistiques globales pour le tableau de bord : totaux, répartition des actifs par type,
// et score de risque global (moyenne sur l'ensemble des entreprises).
exports.getDashboard = async (req, res) => {
  try {
    db.query('SELECT * FROM actifs', async (err, actifs) => {
      if (err) {
        return res.status(500).json({ erreur: err.message });
      }

      db.query('SELECT * FROM vulnerabilites', (err2, vulnerabilites) => {
        if (err2) {
          return res.status(500).json({ erreur: err2.message });
        }

        db.query('SELECT * FROM actifs_entreprises', async (err3, liens) => {
          if (err3) {
            return res.status(500).json({ erreur: err3.message });
          }

          // Répartition des actifs par type
          const repartitionParType = {};
          actifs.forEach(actif => {
            repartitionParType[actif.type] = (repartitionParType[actif.type] || 0) + 1;
          });

          // Enrichit chaque actif avec ses vulnérabilités pour calculer le score global
          const vulnsParId = {};
          vulnerabilites.forEach(v => { vulnsParId[v.vulnerabilite_id] = v; });

          const actifsEnrichis = actifs.map(actif => ({
            ...actif,
            vulnerabilites: liens
              .filter(l => l.actif_id === actif.actif_id)
              .map(l => vulnsParId[l.vulnerabilite_id])
              .filter(Boolean)
          }));

          const { scoreGlobal, niveauRisque } = calculerScores(actifsEnrichis);

          res.status(200).json({
            nombre_actifs: actifs.length,
            nombre_vulnerabilites: liens.length,
            repartition_par_type: repartitionParType,
            score_risque_global: parseFloat(scoreGlobal.toFixed(2)),
            niveau_risque_global: niveauRisque
          });
        });
      });
    });
  } catch (erreur) {
    console.error('Erreur:', erreur);
    res.status(500).json({ erreur: 'Erreur lors du chargement du tableau de bord' });
  }
};
