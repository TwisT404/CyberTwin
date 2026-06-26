class Risk {
  constructor(entreprise_id, nombre_actifs, nombre_vulnerabilites, score_risque, niveau_risque, details) {
    this.entreprise_id = entreprise_id;
    this.nombre_actifs = nombre_actifs; // Nombre d'actifs analysés
    this.nombre_vulnerabilites = nombre_vulnerabilites; // Nombre total de vulnérabilités détectées
    this.score_risque = score_risque; // Score de risque (0-100)
    this.niveau_risque = niveau_risque; // "Critique", "Élevé", "Moyen", "Faible"
    this.details = details; // Détails du calcul (dont le détail par actif)
    this.date_calcul = new Date();
  }
}

module.exports = Risk;
