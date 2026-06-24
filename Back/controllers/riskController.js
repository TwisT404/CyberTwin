const Risque = require('../models/risk.js');

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

exports.calculerRisque = async (req, res) => {
  try {
    const { entreprise_id, actifs, vulnerabilites } = req.body;
    
    if (!entreprise_id || !actifs?.length || !Array.isArray(vulnerabilites)) {
      return res.status(400).json({ erreur: 'Données invalides' });
    }
    
    let scoresActifs = [];
    let detailsParActif = [];
    
    actifs.forEach(actif => {
      const vulnAssociees = vulnerabilites.filter(v => 
        actif.vulnerabilites?.includes(v.vulnerabilite_id)
      );
      
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
        score_risque: parseFloat(scoreActif.toFixed(2)),
        nombre_vulnerabilites: vulnAssociees.length,
        expose_internet: actif.est_expose_internet
      });
    });
    
    const scoreGlobal = scoresActifs.reduce((a, b) => a + b, 0) / scoresActifs.length;
    
    const niveauRisque = scoreGlobal >= 80 ? 'Critique' 
                       : scoreGlobal >= 60 ? 'Élevé'
                       : scoreGlobal >= 40 ? 'Moyen'
                       : 'Faible';
    
    const resultat = new Risk(
      entreprise_id,
      actifs,
      vulnerabilites,
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
