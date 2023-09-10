import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PotentialClientEntity } from '../../common/entities/potential-client.entity';
import { defaultPerPage, getPaginatedData } from '../../utils/pagination.util';
import { GetClientsDto } from './dto/get-clients.dto';
import { AddClientDto } from './dto/add-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class PotentialClientsService {
  constructor(
    @InjectRepository(PotentialClientEntity) private readonly potentialClientsRepo: Repository<PotentialClientEntity>,
  ) {}

  async addClient(addClientDto: AddClientDto) {
    const order = this.potentialClientsRepo.create({ ...addClientDto });
    await this.potentialClientsRepo.save(order);
    return { success: true };
  }

  async updateClient(clientId: string, updateClientDto: UpdateClientDto) {
    const clientToModify = await this.potentialClientsRepo.findOne({ id: Number(clientId) });
    if (!clientToModify) {
      throw new NotFoundException();
    }

    await this.potentialClientsRepo.update({ id: Number(clientId) }, updateClientDto);
    return { success: true };
  }

  async deleteClient(clientId: string) {
    await this.potentialClientsRepo.delete({ id: Number(clientId) });
    return { success: true };
  }

  getClientsList(getClientsDto: GetClientsDto) {
    let query = this.potentialClientsRepo.createQueryBuilder('clients').orderBy('id', 'DESC').where('1=1');

    if (getClientsDto.phoneNumber) {
      query = query.andWhere('clients.phone_number = :phoneNumber', { phoneNumber: getClientsDto.phoneNumber });
    }

    return getPaginatedData(query, getClientsDto.page, defaultPerPage);
  }
}
