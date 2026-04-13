# Schema-Inkonsistenzen

Die folgenden Inkonsistenzen stammen aus dem originalen ER-Diagramm und wurden bewusst beibehalten.

## 1. ItemContent.itemMaterialTypeId

**Problem**: Das Feld `item_material_type_id` in `Item_Content` referenziert die Tabelle `Item_Content_Types`. Der Feldname suggeriert "Material Type", die Zieltabelle heißt aber "Content Type".

**Im Code**: Das Feld heißt `itemMaterialTypeId` und der FK zeigt auf `ItemContentType`.

## 2. ItemContents.itemMaterialId

**Problem**: Die Junction-Table `Item_Contents` hat einen FK `item_material_id` der auf `Item_Content` zeigt. Der Name "material" statt "content" ist verwirrend.

**Im Code**: `itemMaterialId` referenziert eine `ItemContent`-Entität.

## 3. ItemContentTags – itemId zeigt auf ItemContent

**Problem**: Die Tabelle `Item_Content_Tags` hat ein Feld `item_id`, aber die Beziehungslinie im ER-Diagramm zeigt auf `Item_Content`, nicht auf `Item`. Der Feldname ist irreführend.

**Im Code**: `ItemContentTag.itemId` ist ein FK auf `ItemContent`.

## 4. ItemContentTypes – doppelter item_content_type_id

**Problem**: In `Item_Content_Types` erscheint `item_content_type_id` sowohl als Primärschlüssel als auch als Fremdschlüssel (auf sich selbst?). Das ergibt semantisch keinen Sinn.

**Lösung im Code**: MongoDB's `_id` wird als PK verwendet. Das Feld `itemContentTypeId` im Assignment verweist klar auf die referenzierte `ItemContentType`-Entität.

## 5. ItemCollection.order – Inline-Kommentar

**Problem**: Das Feld `order` im ER-Diagramm enthält einen eingebetteten Kommentar ("LINEAR oder beliebig"). Es ist unklar ob das ein Enum oder Freitext sein soll.

**Lösung im Code**: Als optionales Enum `CollectionOrder` (`LINEAR` | `ARBITRARY`) implementiert.
