import mongoose, { Schema, Document } from 'mongoose';

/**
 * NOTE (Schema Inconsistency):
 * Original schema uses 'item_material_type_id' as FK name,
 * while the referenced entity is 'Item_Content_Type'.
 */
export interface ItemContentDocument extends Document {
  licenseId: mongoose.Types.ObjectId;
  /** Maps to item_material_type_id — FK to Item_Content_Type */
  itemMaterialTypeId: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  jsonSerializedContent: Record<string, unknown> | null;
  blobSerializedContent: string | null;
}

const ItemContentSchema = new Schema<ItemContentDocument>(
  {
    licenseId: { type: Schema.Types.ObjectId, ref: 'License', required: true },
    itemMaterialTypeId: {
      type: Schema.Types.ObjectId,
      ref: 'ItemContentType',
      required: true,
    },
    authorId: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    jsonSerializedContent: { type: Schema.Types.Mixed, default: null },
    blobSerializedContent: { type: String, default: null },
  },
  { timestamps: true },
);

export const ItemContentModel = mongoose.model<ItemContentDocument>(
  'ItemContent',
  ItemContentSchema,
  'item_contents',
);
