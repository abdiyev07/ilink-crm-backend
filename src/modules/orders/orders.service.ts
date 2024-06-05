import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from '../../common/entities/order.entity';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { defaultPerPage, getPaginatedData } from '../../utils/pagination.util';
import { AddOrderDto } from './dto/add-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetOrdersDto } from './dto/get-order.dto';
import { createExcelTemplate, CreateExcelTemplateColumns } from '../../common/utils/excel';
import { formatDate } from '../../common/utils/datetime';

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

  async generateExcelForOrdersList(startDate: string, endDate: string, response: Response) {
    const data = await this.ordersRepository
      .createQueryBuilder('orders')
      .orderBy('id', 'DESC')
      .where('orders.created_at BETWEEN :startDate AND :endDate', {
        startDate: startDate,
        endDate: endDate,
      })
      .getMany();
    if (!data || !data.length) throw new BadRequestException('За выбранный период отсутствуют данные');

    const excelColumns: Array<CreateExcelTemplateColumns> = [
      { width: 5, columnTitle: '№' },
      { width: 20, columnTitle: 'UID клиента' },
      { width: 20, columnTitle: 'Номер телефона' },
      { width: 30, columnTitle: 'Тип работы' },
      { width: 30, columnTitle: 'Причина' },
      { width: 30, columnTitle: 'Тип клиента' },
      { width: 25, columnTitle: 'Статус' },
      { width: 10, columnTitle: 'CSI' },
      { width: 40, columnTitle: 'Суб. провайдер' },
      { width: 40, columnTitle: 'Монтажная бригада' },
      { width: 30, columnTitle: 'Адрес' },
      { width: 30, columnTitle: 'Дата создания' },
      { width: 30, columnTitle: 'Дата устранения' },
      { width: 30, columnTitle: 'Платно/бесплатно' },
    ];

    const { wb, ws, dataFillingStartIdx, style } = createExcelTemplate({
      title: `Таблица заявок за период: ${startDate} - ${endDate}`,
      workSheetName: 'Таблица заявок',
      columns: excelColumns,
    });
    let cellIdx = dataFillingStartIdx;

    data.forEach((el) => {
      ws.cell(cellIdx, 1)
        .number(el.id + 1)
        .style(style);
      ws.cell(cellIdx, 2).string(el.client_uid).style(style);
      ws.cell(cellIdx, 3).string(el.contact_phone_number).style(style);
      ws.cell(cellIdx, 4).string(el.work_type).style(style);
      ws.cell(cellIdx, 5).string(el.breakdown_reason).style(style);
      ws.cell(cellIdx, 6).string(el.client_type).style(style);
      ws.cell(cellIdx, 7).string(el.status).style(style);
      ws.cell(cellIdx, 8).string(el.csi).style(style);
      ws.cell(cellIdx, 9).string(el.sub_provider).style(style);
      ws.cell(cellIdx, 10).string(el.executors).style(style);
      ws.cell(cellIdx, 11).string(el.address).style(style);
      ws.cell(cellIdx, 12).string(formatDate(el.created_at, true)).style(style);
      ws.cell(cellIdx, 13).string(formatDate(el.fixed_at, false)).style(style);
      ws.cell(cellIdx, 14)
        .string(el.is_free ? 'Бесплатно' : 'Платно')
        .style(style);

      cellIdx++;
    });

    const outputFileName = 'ilink-orders.xlsx';
    wb.write(outputFileName, response);
  }
}
