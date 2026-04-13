# Task Bank Platform

Eine Plattform zur Verwaltung von Aufgaben (Items) in einem Lernsystem.

## Tech Stack

| Bereich    | Technologie                                  |
|------------|----------------------------------------------|
| Backend    | Node.js, TypeScript, GraphQL Yoga, Mongoose  |
| Frontend   | Vue 3, Vuetify 3, Apollo Client, Vite        |
| Datenbank  | MongoDB 7                                    |
| Infra      | Docker, Docker Compose, nginx                |

## Architektur

Das Backend folgt einer Clean Architecture mit 4 Schichten:

```
interfaces/ (GraphQL Schema + Resolver)
  ↓
application/ (Services – Geschäftslogik)
  ↓
domain/ (Entities, Repository-Interfaces, Enums)
  ↓
infrastructure/ (Mongoose Models, Mapper, Repository-Implementierungen)
```

Das zentrale Domänenobjekt ist **Item**. Ein Item bildet immer genau eine Aufgabe ab.

## Voraussetzungen

- Node.js >= 20
- npm >= 10
- Docker & Docker Compose

## Setup & Start

```bash
# 1. Repository klonen
git clone <repo-url> && cd task-bank-platform

# 2. Abhängigkeiten installieren
npm install

# 3. Umgebungsvariablen konfigurieren
cp .env.example .env

# 4. Mit Docker starten
docker compose up --build

# Oder: Lokal entwickeln (MongoDB muss laufen)
docker compose up mongodb -d
npm run dev
```

### Verfügbare Services

| Service       | URL                          |
|---------------|------------------------------|
| Frontend      | http://localhost:8080        |
| GraphQL API   | http://localhost:4000/graphql |
| Mongo Express | http://localhost:8081 (Profil: `admin`) |

### Seed-Daten laden

```bash
npm run seed
```

## Projektstruktur

```
task-bank-platform/
├── apps/
│   ├── backend/
│   │   └── src/
│   │       ├── config/            # Konfiguration (env vars)
│   │       ├── domain/            # Entities, Enums, Repository-Interfaces
│   │       ├── application/       # Services (Geschäftslogik)
│   │       ├── infrastructure/    # Mongoose Models, Mapper, Repos
│   │       ├── interfaces/        # GraphQL Schema + Resolver
│   │       ├── shared/            # Logger, Errors, Utils
│   │       ├── app.ts             # DI-Wiring, Yoga-Server
│   │       ├── server.ts          # Einstiegspunkt
│   │       └── seed.ts            # Seed-Daten
│   └── frontend/
│       └── src/
│           ├── app/               # Router, Layouts
│           ├── modules/           # Feature-Module (items, authors, ...)
│           └── plugins/           # Vuetify, Apollo
├── docker/                        # Docker-Konfigurationen
├── docs/                          # Dokumentation
├── docker-compose.yml
└── package.json                   # Workspace-Root
```

## Domänenmodell

Siehe [docs/domain/entities.md](docs/domain/entities.md) für eine vollständige Beschreibung aller 18 Entitäten.

Bekannte Schema-Inkonsistenzen aus dem ER-Diagramm sind in [docs/domain/schema-notes.md](docs/domain/schema-notes.md) dokumentiert.

## Lizenz

MIT