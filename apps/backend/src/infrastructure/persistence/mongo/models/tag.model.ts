import mongoose, { Schema, Document } from 'mongoose';

export interface TagDocument extends Document {
  parentTagId: mongoose.Types.ObjectId | null;
  tag: string;
  description: string;
}

const TagSchema = new Schema<TagDocument>(
  {
    parentTagId: { type: Schema.Types.ObjectId, ref: 'Tag', default: null },
    tag: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const TagModel = mongoose.model<TagDocument>('Tag', TagSchema, 'tags');
