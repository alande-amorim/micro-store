import { RepositoryInterface } from './base-repository.interface';
import { Order } from '@app/common';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class OrdersRepository implements RepositoryInterface<Order.Entity> {
  constructor(private readonly db: PrismaService) {}

  list(): Promise<Order.Entity[]> {
    return this.db.order.findMany();
  }

  get(id: string): Promise<Order.Entity> {
    return this.db.order.findUnique({ where: { id } });
  }

  async create({ customer, shippingAddress, items, ...data }: CreateOrderDto) {
    const created = await this.db.order.create({
      data: {
        ...data,
        customer: { create: customer },
        shippingAddress: { create: shippingAddress },
        items: { create: items },
      },
    });

    console.log(created);
    return created;
  }

  update(id: string, data: unknown): Promise<Order.Entity> {
    return this.db.order.update({ where: { id }, data });
  }

  delete(id: string): Promise<boolean> {
    console.log(id);
    throw new Error('Method not implemented.');
  }
}
