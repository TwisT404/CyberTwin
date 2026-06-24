class Company {
  constructor(id, name, sector, employees, servers, client_stations, exposed_services) {
    this.entreprise_id = id;
    this.entreprise_nom = name;
    this.secteur = sector; // "IT", "Finance", "Healthcare", etc.
    this.employes = employees;
    this.serveurs = servers;
    this. postes_clients = client_stations;
    this.services_exposes = exposed_services;
  }
}

module.exports = Company;