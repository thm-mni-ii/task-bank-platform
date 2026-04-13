# Domänen-Entitäten

Übersicht aller 18 Entitäten im System.

## Stammdaten

### Author
| Feld       | Typ    | Beschreibung          |
|------------|--------|-----------------------|
| id         | ID     | Primärschlüssel       |
| descriptor | String | Name/Bezeichnung      |
| mail       | String | E-Mail-Adresse        |

### License
| Feld    | Typ         | Beschreibung |
|---------|-------------|--------------|
| id      | ID          | Primärschlüssel |
| license | LicenseType | CC0, CC_BY, CC_BY_SA, CC_BY_NC, CC_BY_NC_SA, CC_BY_ND, CC_BY_NC_ND |

### Tag
| Feld        | Typ     | Beschreibung              |
|-------------|---------|---------------------------|
| id          | ID      | Primärschlüssel           |
| parentTagId | ID?     | Eltern-Tag (Hierarchie)   |
| tag         | String  | Tag-Bezeichnung           |
| description | String  | Beschreibung              |

### ItemType
| Feld         | Typ    | Beschreibung          |
|--------------|--------|-----------------------|
| id           | ID     | Primärschlüssel       |
| itemTypeName | String | Name des Aufgabentyps |
| description  | String | Beschreibung          |

### ItemContentType
| Feld               | Typ    | Beschreibung         |
|--------------------|--------|----------------------|
| id                 | ID     | Primärschlüssel      |
| itemContentTypeName| String | Name des Inhaltstyps |
| description        | String | Beschreibung         |

### Modifier
| Feld        | Typ    | Beschreibung          |
|-------------|--------|-----------------------|
| id          | ID     | Primärschlüssel       |
| modifier    | String | Modifier-Bezeichner   |
| description | String | Beschreibung          |

### Validator
| Feld        | Typ    | Beschreibung            |
|-------------|--------|-------------------------|
| id          | ID     | Primärschlüssel         |
| validator   | String | Validator-Bezeichner    |
| description | String | Beschreibung            |

## Kernentitäten

### Item
| Feld           | Typ  | Beschreibung                      |
|----------------|------|-----------------------------------|
| id             | ID   | Primärschlüssel                   |
| authorId       | ID   | FK → Author                       |
| licenseId      | ID   | FK → License                      |
| itemTypeId     | ID   | FK → ItemType                     |
| itemTemplateId | ID   | FK → ItemRepresentationTemplate   |
| rootItemId     | ID?  | FK → Item (Self-Referenz, optional)|

### ItemRepresentationTemplate
| Feld     | Typ    | Beschreibung               |
|----------|--------|----------------------------|
| id       | ID     | Primärschlüssel            |
| template | JSON   | Darstellungs-Konfiguration |

### ItemContent
| Feld                   | Typ    | Beschreibung                    |
|------------------------|--------|---------------------------------|
| id                     | ID     | Primärschlüssel                 |
| licenseId              | ID     | FK → License                    |
| itemMaterialTypeId     | ID     | FK → ItemContentType (Namensinkonsistenz!) |
| authorId               | ID     | FK → Author                     |
| jsonSerializedContent  | JSON?  | JSON-Inhalte                    |
| blobSerializedContent  | String?| Binäre Inhalte (Base64)         |

### ItemCollection
| Feld         | Typ             | Beschreibung              |
|--------------|-----------------|---------------------------|
| id           | ID              | Primärschlüssel           |
| parentItemId | ID              | FK → Item                 |
| order        | CollectionOrder?| LINEAR oder ARBITRARY      |

## Verknüpfungstabellen (Junction Tables)

| Entität                     | Verknüpft           | Besonderheit                  |
|-----------------------------|---------------------|-------------------------------|
| ItemTag                     | Item ↔ Tag          | Compound Key (itemId, tagId)  |
| ItemContentTag              | ItemContent ↔ Tag   | Trotz Name im ER: itemId zeigt auf ItemContent |
| ItemModifier                | Item ↔ Modifier     | Compound Key                  |
| ItemValidator               | Item ↔ Validator    | Compound Key                  |
| ItemContentTypeAssignment   | ItemType ↔ ContentType | Eigene ID + FKs            |
| ItemContents                | Item ↔ ItemContent  | purpose: STIMULUS/SOLUTION    |
| ItemCollectionSubItem       | Collection ↔ Item   | position für Reihenfolge      |
