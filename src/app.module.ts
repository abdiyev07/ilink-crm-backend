import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mainDbConfig } from './config/db.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import * as path from 'path';
import { OrdersModule } from './modules/orders/orders.module';
import { PotentialClientsModule } from './modules/potential-clients/potential-clients.module';

const mainDbEntitiesPath = path.join(path.resolve(), 'dist', 'src', 'common', 'entities', '*.entity.js');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...mainDbConfig,
      entities: [mainDbEntitiesPath],
    }),
    AuthModule,
    UsersModule,
    OrdersModule,
    PotentialClientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
