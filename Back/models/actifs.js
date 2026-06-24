class Actifs {
  constructor(actif_id, actif_nom, type, criticite, vulnerabilites = [], est_expose_internet = false) {
    this.actif_id = actif_id;
    this.actif_nom = actif_nom;
    this.type = type; // "Serveur Web", "Base de données", etc.
    this.criticite = criticite; // "Faible", "Moyenne", "Élevée"
    this.vulnerabilites = vulnerabilites; // Tableau d'IDs ou objets de vulnérabilités
    this.est_expose_internet = est_expose_internet;
  }
}

module.exports = Actifs;