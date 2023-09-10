import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../../common/entities/order.entity';
import { Repository } from 'typeorm';
import { defaultPerPage, getPaginatedData } from '../../utils/pagination.util';
import { AddOrderDto } from './dto/add-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetOrdersDto } from './dto/get-order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectRepository(OrderEntity) private readonly ordersRepository: Repository<OrderEntity>) {}

  async addOrder(addOrderDto: AddOrderDto) {
    const order = this.ordersRepository.create({ ...addOrderDto });
    await this.ordersRepository.save(order);
    return { success: true };
  }

  async updateOrder(orderId: string, updateOrderDto: UpdateOrderDto) {
    const orderToModify = await this.ordersRepository.findOne({ id: Number(orderId) });
    if (!orderToModify) {
      throw new NotFoundException();
    }

    if (updateOrderDto.fixed_at) {
      updateOrderDto.fixed_at = new Date(updateOrderDto.fixed_at);
    }

    await this.ordersRepository.update({ id: Number(orderId) }, updateOrderDto);

    return { success: true };
  }

  async deleteOrder(orderId: string) {
    await this.ordersRepository.softDelete({ id: Number(orderId) });
    return { success: true };
  }

  getOrdersList(getOrdersDto: GetOrdersDto) {
    let query = this.ordersRepository.createQueryBuilder('orders').orderBy('id', 'DESC').where('1=1');

    if (getOrdersDto.orderId) {
      query = query.andWhere('orders.id = :orderId', { orderId: getOrdersDto.orderId });
    }

    if (getOrdersDto.phoneNumber) {
      query = query.andWhere('orders.contact_phone_number = :phoneNumber', { phoneNumber: getOrdersDto.phoneNumber });
    }

    return getPaginatedData(query, getOrdersDto.page, defaultPerPage);
  }
}
