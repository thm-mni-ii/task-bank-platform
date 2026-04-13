# Architektur-Überblick

## Systemübersicht

Die Task Bank Platform ist ein Monorepo mit zwei Anwendungen:

- **Backend** (`apps/backend`): GraphQL-API auf Basis von Node.js, TypeScript und GraphQL Yoga
- **Frontend** (`apps/frontend`): Single-Page-Application mit Vue 3, Vuetify und Apollo Client

Die Kommunikation erfolgt ausschließlich über GraphQL.

## Deployment-Architektur

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Browser    │────▶│  nginx :8080 │     │  MongoDB    │
│  (Vue SPA)  │     │  (Frontend)  │     │  :27017     │
└─────────────┘     └──────────────┘     └──────┬──────┘
      │                                         │
      │  GraphQL                                │  Mongoose
      ▼                                         │
┌──────────────────────────────────────────────┐│
│         GraphQL Yoga Server :4000            ││
│  ┌────────────┬───────────┬────────────────┐ ││
│  │ Interfaces │Application│ Infrastructure │◀┘│
│  │  (GraphQL) │ (Services)│  (Mongoose)    │  │
│  └────────────┴───────────┴────────────────┘  │
└───────────────────────────────────────────────┘
```

Alle Services werden über Docker Compose orchestriert.

## Technologie-Entscheidungen

| Entscheidung         | Begründung                                                |
|----------------------|----------------------------------------------------------|
| GraphQL Yoga         | Leichtgewichtig, Schema-first, gute TypeScript-Integration |
| Mongoose             | Schema-Validierung auf DB-Ebene, reifes Ökosystem        |
| Vue 3 + Vuetify      | Komponentenbibliothek mit Material Design für schnelle UI |
| Apollo Client        | Standardlösung für GraphQL im Frontend, Caching          |
| npm Workspaces       | Einfaches Monorepo-Setup ohne zusätzliche Tools           |
| CommonJS (Backend)   | Vermeidet ESM-Importprobleme mit `.js`-Erweiterungen     |
