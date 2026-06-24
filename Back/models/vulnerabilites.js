class Vulnerabilites {
  constructor(vulnaribilite_id, vulnaribilite_nom, description, gravite) {
    this.vulnaribilite_id = vulnaribilite_id;
    this.vulnaribilite_nom = vulnaribilite_nom;
    this.description = description;
    this.gravite = gravite;
  }
}

module.exports = Vulnerabilites;