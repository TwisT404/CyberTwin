class Risk {
  constructor(entreprise_id, actifs, vulnerabilites, score_risque, niveau_risque, details) {
    this.entreprise_id = entreprise_id;
    this.actifs = actifs; // Actifs analysés
    this.vulnerabilites = vulnerabilites; // Vulnérabilités associées
    this.score_risque = score_risque; // Score de risque (0-100)
    this.niveau_risque = niveau_risque; // "Critique", "Élevé", "Moyen", "Faible"
    this.details = details; // Détails du calcul
    this.date_calcul = new Date();
  }
}

module.exports = Risk;
