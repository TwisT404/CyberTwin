class Asset {
  constructor(id, name, type, criticality, vulnerabilities = [], isExposedToInternet = false) {
    this.id = id;
    this.name = name;
    this.type = type; // "Serveur Web", "Base de données", etc.
    this.criticality = criticality; // "Faible", "Moyenne", "Élevée"
    this.vulnerabilities = vulnerabilities; // Tableau d'IDs ou objets de vulnérabilités
    this.isExposedToInternet = isExposedToInternet;
  }
}

module.exports = Asset;