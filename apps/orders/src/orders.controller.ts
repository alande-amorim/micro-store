import {
  Controller,
  Get,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard, Order, Shopify } from '@app/common';

@Controller()
export class OrdersController {
  constructor(private service: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): Promise<Order.Entity[]> {
    return this.service.getAll();
  }

  @MessagePattern('webhook')
  async handleWebhook(
    @Payload() data: Shopify.Order.Created,
    @Ctx() context: RmqContext,
  ): Promise<Order.Entity> {
    try {
      const dto = new CreateOrderDto(data);
      return await this.service.handleWebhook(dto);
    } catch (error) {
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();

      if (error instanceof UnprocessableEntityException) {
        channel.ack(originalMsg);
      }

      throw new RpcException(error);
    }
  }
}
