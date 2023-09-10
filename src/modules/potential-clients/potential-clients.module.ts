import { Module } from '@nestjs/common';
import { PotentialClientsController } from './potential-clients.controller';
import { PotentialClientsService } from './potential-clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PotentialClientEntity } from '../../common/entities/potential-client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PotentialClientEntity])],
  controllers: [PotentialClientsController],
  providers: [PotentialClientsService],
})
export class PotentialClientsModule {}
