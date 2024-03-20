import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SyncOrderDto } from './dto/sync-order.dto';

@Controller()
export class OrdersController {
  constructor(private service: OrdersService) {}

  // @Get()
  // getAll(): Promise<Order.Entity[]> {
  //   return this.service.getAll();
  // }

  // @Get(':id')
  // async getById(@Param('id') id: string): Promise<Order.Entity> {
  //   const order = await this.service.getById(id);
  //   if (!order) throw new NotFoundException('Order id not found');
  //   return order;
  // }

  @MessagePattern('webhook')
  async handleWebhook(@Payload() data: SyncOrderDto) {
    await this.service.handleWebhook(data);
    return 'ok';
  }
}
