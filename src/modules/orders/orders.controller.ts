import { Body, Controller, Delete, Get, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { OrdersService } from './orders.service';
import { AddOrderDto } from './dto/add-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { GetOrdersDto } from './dto/get-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getOrders(@Query() getOrdersDto: GetOrdersDto) {
    return this.ordersService.getOrdersList(getOrdersDto);
  }

  @Post()
  addOrder(@Body() addOrderDto: AddOrderDto) {
    return this.ordersService.addOrder(addOrderDto);
  }

  @Put(':id')
  updateOrder(@Param('id') orderId: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.updateOrder(orderId, updateOrderDto);
  }

  @Delete(':id')
  deleteOrder(@Param('id') orderId: string) {
    return this.ordersService.deleteOrder(orderId);
  }

  @Get('generate-excel')
  generateExcelForOrdersList(
    @Query('start') startDate: string,
    @Query('end') endDate: string,
    @Res() response: Response,
  ) {
    return this.ordersService.generateExcelForOrdersList(startDate, endDate, response);
  }
}
