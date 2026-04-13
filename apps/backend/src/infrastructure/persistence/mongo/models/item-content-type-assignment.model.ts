import mongoose, { Schema, Document } from 'mongoose';

/**
 * NOTE (Schema Inconsistency):
 * Original 'Item_Content_Types' has item_content_type_id as both PK/UK and FK.
 * In this implementation, MongoDB _id serves as PK,
 * and itemContentTypeId is the FK to ItemContentType.
 */
export interface ItemContentTypeAssignmentDocument extends Document {
  itemTypeId: mongoose.Types.ObjectId;
  itemContentTypeId: mongoose.Types.ObjectId;
}

const ItemContentTypeAssignmentSchema = new Schema<ItemContentTypeAssignmentDocument>(
  {
    itemTypeId: { type: Schema.Types.ObjectId, ref: 'ItemType', required: true },
    itemContentTypeId: {
      type: Schema.Types.ObjectId,
      ref: 'ItemContentType',
      required: true,
    },
  },
  { timestamps: true },
);

ItemContentTypeAssignmentSchema.index({ itemTypeId: 1, itemContentTypeId: 1 }, { unique: true });

export const ItemContentTypeAssignmentModel = mongoose.model<ItemContentTypeAssignmentDocument>(
  'ItemContentTypeAssignment',
  ItemContentTypeAssignmentSchema,
  'item_content_type_assignments',
);
