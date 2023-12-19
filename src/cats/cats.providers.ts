import { Connection } from 'mongoose';
import { CatSchema } from './schema/cat.schema';
import { CAT_MODEL, DATABASE_CONNECTION } from 'src/db/db.constants';

export const catsProviders = [
  {
    provide: CAT_MODEL,
    useFactory: (connection: Connection) => connection.model('Cat', CatSchema),
    inject: [DATABASE_CONNECTION],
  },
];
