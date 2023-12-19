import { Connection } from 'mongoose';
import { UserSchema } from './entities/users.entity';
import { DATABASE_CONNECTION } from 'src/db/db.constants';

export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: [DATABASE_CONNECTION],
  },
];
