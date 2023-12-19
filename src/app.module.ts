import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    CatsModule,
    UsersModule,
    ConfigModule.forRoot({ envFilePath: ['.env'] }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
