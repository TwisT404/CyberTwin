class Vulnerability {
  constructor(id, name, description, severity) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.severity = severity;
  }
}

module.exports = Vulnerability;