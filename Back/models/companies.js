class Companies {
  constructor(id, name, sector, employees, servers, client_stations, exposed_services) {
    this.id = id;
    this.name = name;
    this.sector = sector; // "IT", "Finance", "Healthcare", etc.
    this.employees = employees;
    this.servers = servers;
    this.client_stations = client_stations;
    this.exposed_services = exposed_services;
  }
}

module.exports = Companies;