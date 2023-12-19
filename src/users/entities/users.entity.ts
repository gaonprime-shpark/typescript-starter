import { Schema, model, Document } from 'mongoose';
import { CAT_MODEL } from 'src/db/db.constants';
import { Cat } from 'src/interface/cat.interface';

export enum UserRole {
  Admin = 'Admin',
  Customer = 'Customer',
}

export interface User extends Document {
  readonly username: string;
  readonly password: string;
  readonly roles: UserRole[];
  readonly cats: Cat[];
}

export const UserSchema = new Schema<User>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    roles: { type: [String], required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

UserSchema.virtual('cats', {
  ref: 'Cat',
  localField: '_id',
  foreignField: 'user',
});

export const UserModel = model('User', UserSchema);
