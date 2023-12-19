import * as mongoose from 'mongoose';
import { DATABASE_CONNECTION } from './db.constants';

export const dbProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      // mongoose.connect('mongodb://practice-mongo/nest'),
      mongoose.connect(process.env.MONGO_URI),
  },
];
