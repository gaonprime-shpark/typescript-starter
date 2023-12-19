import * as mongoose from 'mongoose';

export const CatSchema = new mongoose.Schema(
  {
    // _id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    name: { type: String, require: true, index: 'text' },
    age: { type: Number, require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);
