import { RepositoryInterface } from './base-repository.interface';
import { Customer } from '@app/common';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class CustomersRepository
  implements RepositoryInterface<Customer.Entity>
{
  constructor(private readonly db: PrismaService) {}

  list(): Promise<Customer.Entity[]> {
    return this.db.customer.findMany();
  }

  get(id: string): Promise<Customer.Entity> {
    return this.db.customer.findUnique({ where: { id } });
  }

  async getOrCreate(data: Customer.Create): Promise<Customer.Entity> {
    const customerExists = await this.db.customer.findUnique({
      where: { email: data.email },
    });

    return customerExists || this.create(data);
  }

  create(data: Customer.Create): Promise<Customer.Entity> {
    return this.db.customer.create({ data });
  }

  update(id: string, data: unknown): Promise<Customer.Entity> {
    return this.db.customer.update({ where: { id }, data });
  }

  delete(id: string): Promise<boolean> {
    console.log(id);
    throw new Error('Method not implemented.');
  }
}
