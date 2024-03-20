import { Order } from '@app/common';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { OrdersRepository } from './repositories/orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private repo: OrdersRepository) {}

  async getAll(): Promise<Order.Entity[]> {
    return this.repo.list();
  }

  async handleWebhook(data: CreateOrderDto): Promise<Order.Entity> {
    const order = await this.repo.find(data);
    if (order) throw new UnprocessableEntityException('Order already exists');
    return this.repo.create(data);
  }
}
