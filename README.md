# CyberTwin

Simulateur de risque cyber pour PME — projet binôme Fullstack Vue.js / Node.js.

## 1. Présentation du projet

CyberTwin est une application web permettant de modéliser une entreprise fictive,
de gérer ses actifs informatiques, de leur associer des vulnérabilités et d'évaluer
automatiquement son niveau de risque cyber.

L'application est composée de deux parties :

- **Front** : application Vue.js (Vue Router, Pinia) qui propose les pages
  Accueil, Entreprise, Actifs, Vulnérabilités, Tableau de bord et Rapport.
- **Back** : API REST Node.js / Express.js qui expose les entreprises, les
  actifs, les vulnérabilités et le calcul de risque, et qui s'appuie sur une
  base de données MySQL.

## 2. Architecture du projet

```
CyberTwin/
├── Back/                  # API Node.js / Express
│   ├── config/            # Connexion à la base de données
│   ├── controllers/       # Logique métier des routes
│   ├── models/            # Représentation des entités
│   ├── routes/            # Définition des routes Express
│   ├── crea_base.sql      # Script de création + données de test (MySQL)
│   ├── .env                # Variables d'environnement (DB, port)
│   └── server.js          # Point d'entrée du serveur
└── Front/                 # Application Vue.js
    └── src/
        ├── assets/        # CSS et images
        ├── components/    # Composants réutilisables (HeaderNav...)
        ├── config/        # URL de l'API
        ├── router/        # Définition des routes Vue Router
        ├── stores/        # Stores Pinia (entreprise, actif, vulnérabilite, risque)
        └── views/         # Pages de l'application
```

## 3. Installation

Prérequis : Node.js (≥ 20) et un serveur MySQL.

### 3.1 Base de données

1. Démarrer un serveur MySQL.
2. Exécuter le script `Back/crea_base.sql`, qui crée la base `db_cybertwin`,
   ses tables, et insère deux entreprises de démonstration (RTE et SLBP) avec
   leurs actifs et vulnérabilités.

```sh
mysql -u root -p < Back/crea_base.sql
```

3. Adapter si besoin le fichier `Back/.env` avec les identifiants de connexion :

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=""
DB_NAME=db_cybertwin
PORT=3006
```

### 3.2 Backend

```sh
cd Back
npm install
```

### 3.3 Frontend

```sh
cd Front
npm install
```

## 4. Exécution

### 4.1 Démarrer le backend

```sh
cd Back
npm start
```

Le serveur démarre par défaut sur `http://localhost:3006`.
(`npm run dev` redémarre automatiquement le serveur à chaque modification.)

### 4.2 Démarrer le frontend

Dans un second terminal :

```sh
cd Front
npm run dev
```

L'application est alors accessible sur l'URL affichée dans le terminal
(par défaut `http://localhost:5173`).

## 5. Description des fonctionnalités

### Gestion de l'entreprise
Création, modification et consultation de la fiche descriptive d'une
entreprise (nom, secteur, employés, serveurs, postes clients, services
exposés sur Internet).

### Gestion des actifs
Ajout, modification, suppression et consultation des actifs informatiques
(Serveur Web, Base de données, Poste utilisateur, Routeur, Pare-feu,
Application métier), avec criticité et exposition Internet.

### Gestion des vulnérabilités
Catalogue de vulnérabilités réutilisables, pouvant être associées à un ou
plusieurs actifs avec un niveau de gravité (Faible, Moyenne, Élevée,
Critique).

### Calcul du risque cyber
Le score de risque d'une entreprise est calculé à partir de la criticité de
ses actifs, du nombre et de la gravité des vulnérabilités associées, et de
l'exposition à Internet. Le résultat est classé en quatre niveaux : Faible,
Moyen, Élevé, Critique.

### Tableau de bord
Vue d'ensemble : nombre total d'actifs, nombre total de vulnérabilités,
répartition des actifs par type (graphique), score de risque global et son
niveau.

### Rapport
Rapport de synthèse pour une entreprise sélectionnée : présentation de
l'entreprise, inventaire des actifs, vulnérabilités détectées, niveau de
risque et recommandations de sécurité générées automatiquement.

## 6. API REST

| Méthode | Route                                              | Description                                      |
|---------|-----------------------------------------------------|---------------------------------------------------|
| GET     | /api/companies                                      | Liste des entreprises                              |
| GET     | /api/companies/:id                                  | Fiche d'une entreprise                             |
| POST    | /api/companies                                      | Création d'une entreprise                          |
| PUT     | /api/companies/:id                                  | Modification d'une entreprise                      |
| DELETE  | /api/companies/:id                                  | Suppression d'une entreprise                       |
| GET     | /api/assets                                         | Liste des actifs                                   |
| GET     | /api/assets/:id                                     | Détail d'un actif                                  |
| GET     | /api/assets/entreprise/:entreprise_id               | Actifs d'une entreprise donnée                     |
| POST    | /api/assets                                         | Création d'un actif                                |
| PUT     | /api/assets/:id                                     | Modification d'un actif                            |
| DELETE  | /api/assets/:id                                     | Suppression d'un actif                             |
| GET     | /api/vulnerabilities                                | Liste des vulnérabilités du catalogue              |
| GET     | /api/vulnerabilities/:id                            | Détail d'une vulnérabilité                         |
| GET     | /api/vulnerabilities/associations                   | Liste de toutes les associations actif/vulnérabilité |
| GET     | /api/vulnerabilities/actif/:actif_id                | Vulnérabilités associées à un actif                |
| POST    | /api/vulnerabilities                                | Création d'une vulnérabilité                       |
| PUT     | /api/vulnerabilities/:id                            | Modification d'une vulnérabilité                   |
| DELETE  | /api/vulnerabilities/:id                            | Suppression d'une vulnérabilité                    |
| POST    | /api/vulnerabilities/associer                       | Associe une vulnérabilité à un actif               |
| DELETE  | /api/vulnerabilities/dissocier/:actif_id/:vulnerabilite_id | Retire une association                      |
| GET     | /api/risk/dashboard                                 | Statistiques globales pour le tableau de bord      |
| POST    | /api/risk/calculate                                 | Calcule le score de risque d'une entreprise        |

## 7. Répartition du travail

- **Frontend** : interface utilisateur, composants Vue.js, Vue Router, Pinia,
  tableau de bord et graphiques.
- **Backend** : serveur Node.js/Express, API REST, gestion des données,
  moteur de calcul du risque.
- **Commun** : architecture générale, intégration Frontend/Backend, tests,
  débogage, rapport et soutenance.
