import { Document, Schema } from 'mongoose';

export interface Cat extends Document {
  readonly _id: string;
  readonly name: string;
  readonly age: number;
  readonly user: Schema.Types.ObjectId;
}
