# Backend-Schichten

Das Backend implementiert eine Clean Architecture mit vier Schichten. Abhängigkeiten zeigen immer nach innen (von interfaces → domain).

## 1. Domain (`src/domain/`)

Die innerste Schicht enthält:

- **Entities**: TypeScript-Interfaces für alle Domänenobjekte
- **Enums**: `LicenseType`, `ItemContentPurpose`, `CollectionOrder`
- **Repository-Interfaces**: Abstrakte CRUD-Verträge (`CrudRepository<T, TCreate, TUpdate>`)

Diese Schicht hat **keine Abhängigkeiten** zu externen Libraries.

## 2. Application (`src/application/`)

Services implementieren die Geschäftslogik:

- Validierung von Fremdschlüssel-Referenzen (z.B. prüft `ItemService` ob Author, License, ItemType existieren)
- Orchestrierung von Repository-Aufrufen
- Fehlerbehandlung mit domänenspezifischen Errors (`NotFoundError`, `ConflictError`)

Services erhalten Repositories über Constructor Injection.

## 3. Infrastructure (`src/infrastructure/`)

Enthält die konkrete Persistenz-Implementierung:

- **Models**: Mongoose-Schemas und -Models für alle 18 Entitäten
- **Mapper**: Statische Klassen die Mongoose-Dokumente zu Domain-Entities konvertieren
- **Repositories**: Implementierungen der Domain-Repository-Interfaces mit Mongoose

Mongoose wird **nur** in dieser Schicht verwendet.

## 4. Interfaces (`src/interfaces/`)

Die äußerste Schicht enthält die GraphQL-API:

- **Schema**: SDL-Definitionen für Types, Inputs, Queries und Mutations
- **Resolver**: GraphQL-Resolver die Services aufrufen
- **Context**: Request-Kontext mit `requestId` (vorbereitet für Auth)

## Dependency Injection

Die Verdrahtung aller Schichten geschieht in `src/app.ts`:

```
Repository-Instanzen → Service-Instanzen → Resolver → GraphQL-Schema
```

Es wird kein DI-Container verwendet – die Komposition erfolgt manuell (Pure DI).
