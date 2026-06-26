-- Script de création de la base de données CyberTwin (MySQL)
-- Adapté à partir du script fourni (qui utilisait une syntaxe SQLite)

CREATE DATABASE IF NOT EXISTS db_cybertwin CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE db_cybertwin;

CREATE TABLE IF NOT EXISTS entreprises (
    entreprise_id INT AUTO_INCREMENT PRIMARY KEY,
    entreprise_nom VARCHAR(255) NOT NULL,
    secteur VARCHAR(255) NOT NULL,
    employes INT NOT NULL,
    serveurs INT NOT NULL,
    postes_clients INT NOT NULL,
    services_exposes TEXT
);

CREATE TABLE IF NOT EXISTS actifs (
    actif_id INT AUTO_INCREMENT PRIMARY KEY,
    actif_nom VARCHAR(255) NOT NULL,
    type ENUM('Serveur Web', 'Base de données', 'Poste utilisateur', 'Routeur', 'Pare-feu', 'Application métier') NOT NULL,
    criticite ENUM('Faible', 'Moyenne', 'Élevée', 'Critique') NOT NULL,
    est_expose_internet BOOLEAN NOT NULL DEFAULT FALSE,
    entreprise_id INT NOT NULL,
    FOREIGN KEY (entreprise_id) REFERENCES entreprises(entreprise_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vulnerabilites (
    vulnerabilite_id INT AUTO_INCREMENT PRIMARY KEY,
    vulnerabilite_nom VARCHAR(255) NOT NULL,
    description TEXT,
    gravite ENUM('Faible', 'Moyenne', 'Élevée', 'Critique') NOT NULL
);

CREATE TABLE IF NOT EXISTS actifs_entreprises (
    actif_id INT NOT NULL,
    vulnerabilite_id INT NOT NULL,
    entreprise_id INT NOT NULL,
    PRIMARY KEY (actif_id, vulnerabilite_id),
    FOREIGN KEY (actif_id) REFERENCES actifs(actif_id) ON DELETE CASCADE,
    FOREIGN KEY (vulnerabilite_id) REFERENCES vulnerabilites(vulnerabilite_id) ON DELETE CASCADE
);

INSERT INTO entreprises (entreprise_nom, secteur, employes, serveurs, postes_clients, services_exposes) VALUES
('RTE', 'Energie', 5000, 4, 600, '40'),
('SLBP', 'Bancaire', 150, 3, 0, '10');

INSERT INTO actifs (actif_nom, type, criticite, est_expose_internet, entreprise_id) VALUES
('Serveur Principal', 'Serveur Web', 'Critique', FALSE, 1),
('Base de Production', 'Base de données', 'Élevée', FALSE, 1),
('Poste Ingénieur', 'Poste utilisateur', 'Moyenne', FALSE, 1),
('Routeur', 'Routeur', 'Critique', FALSE, 1),
('Pare-feu Périmètre OT', 'Pare-feu', 'Critique', FALSE, 1),
('Application Gestion Énergie EMS', 'Application métier', 'Élevée', TRUE, 1),
('Serveur Web Banque en Ligne', 'Serveur Web', 'Critique', TRUE, 2),
('Base Clients & Comptes', 'Base de données', 'Critique', FALSE, 2),
('Poste Conseiller Agence', 'Poste utilisateur', 'Moyenne', FALSE, 2),
('Routeur Réseau Agence Paris', 'Routeur', 'Élevée', FALSE, 2),
('Pare-feu Datacenter Banque', 'Pare-feu', 'Critique', FALSE, 2),
('Application Paiement SEPA', 'Application métier', 'Critique', TRUE, 2);

INSERT INTO vulnerabilites (vulnerabilite_nom, description, gravite) VALUES
('Mots de passe faibles', 'Utilisation de mots de passe simples, réutilisés ou facilement devinables.', 'Élevée'),
('Absence de mises à jour', 'Le système ou l’application n’est pas patché, exposant des failles connues.', 'Critique'),
('Port ouvert non nécessaire', 'Un service expose un port inutile augmentant la surface d’attaque.', 'Moyenne'),
('Chiffrement absent ou faible', 'Les communications ne sont pas chiffrées ou utilisent des protocoles obsolètes.', 'Critique'),
('Mauvaise configuration du pare-feu', 'Règles trop permissives permettant un accès non autorisé.', 'Élevée'),
('Injection SQL', 'L’application est vulnérable à des injections SQL via des entrées non filtrées.', 'Critique'),
('Manque de journalisation', 'Absence de logs suffisants pour détecter ou analyser un incident.', 'Moyenne'),
('Accès administrateur trop large', 'Des comptes disposent de privilèges excessifs par rapport à leurs besoins.', 'Élevée'),
('Service exposé sur Internet', 'Un service interne est accessible depuis Internet sans protection adéquate.', 'Critique'),
('Absence d’antivirus ou EDR', 'Le poste ou serveur ne dispose pas de protection contre les malwares.', 'Élevée');

INSERT INTO actifs_entreprises (actif_id, vulnerabilite_id, entreprise_id) VALUES
(1, 2, 1),  -- Serveur Principal -> Absence de mises à jour
(1, 4, 1),  -- Serveur Principal -> Chiffrement faible
(2, 7, 1),  -- Base de Production -> Manque de journalisation
(2, 3, 1),  -- Base de Production -> Port ouvert non nécessaire
(3, 1, 1),  -- Poste Ingénieur -> Mots de passe faibles
(3, 10, 1), -- Poste Ingénieur -> Absence d'antivirus/EDR
(4, 5, 1),  -- Routeur -> Mauvaise configuration du pare-feu
(4, 9, 1),  -- Routeur -> Service exposé Internet
(5, 5, 1),  -- Pare-feu Périmètre OT -> Mauvaise configuration
(5, 8, 1),  -- Pare-feu Périmètre OT -> Accès admin trop large
(6, 6, 1),  -- Application EMS -> Injection SQL
(6, 4, 1),  -- Application EMS -> Chiffrement faible
(7, 9, 2),  -- Serveur Web Banque en Ligne -> Service exposé Internet
(7, 2, 2),  -- Serveur Web Banque en Ligne -> Absence de mises à jour
(8, 6, 2),  -- Base Clients & Comptes -> Injection SQL
(8, 4, 2),  -- Base Clients & Comptes -> Chiffrement faible
(9, 1, 2),  -- Poste Conseiller Agence -> Mots de passe faibles
(9, 10, 2), -- Poste Conseiller Agence -> Absence d'antivirus/EDR
(10, 3, 2), -- Routeur Réseau Agence Paris -> Port ouvert non nécessaire
(10, 5, 2), -- Routeur Réseau Agence Paris -> Mauvaise configuration du pare-feu
(11, 8, 2), -- Pare-feu Datacenter Banque -> Accès admin trop large
(11, 7, 2), -- Pare-feu Datacenter Banque -> Manque de journalisation
(12, 6, 2), -- Application Paiement SEPA -> Injection SQL
(12, 4, 2); -- Application Paiement SEPA -> Chiffrement faible
