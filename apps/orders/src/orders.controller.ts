import { Controller } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, Shopify } from '@app/common';

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
  async handleWebhook(
    @Payload() data: Shopify.Order.Created,
  ): Promise<Order.Entity> {
    const dto = new CreateOrderDto(data);
    return this.service.handleWebhook(dto);
  }
}
