import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { GetClientsDto } from './dto/get-clients.dto';
import { PotentialClientsService } from './potential-clients.service';
import { AddClientDto } from './dto/add-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('potential-clients')
export class PotentialClientsController {
  constructor(private readonly clientsService: PotentialClientsService) {}

  @Get()
  getClients(@Query() getClientsDto: GetClientsDto) {
    return this.clientsService.getClientsList(getClientsDto);
  }

  @Post()
  addOrder(@Body() addClientDto: AddClientDto) {
    return this.clientsService.addClient(addClientDto);
  }

  @Put(':id')
  updateOrder(@Param('id') clientId: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.updateClient(clientId, updateClientDto);
  }

  @Delete(':id')
  deleteOrder(@Param('id') clientId: string) {
    return this.clientsService.deleteClient(clientId);
  }
}
