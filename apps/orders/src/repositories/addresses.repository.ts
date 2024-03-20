import { RepositoryInterface } from './base-repository.interface';
import { Address } from '@app/common';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AddressesRepository
  implements RepositoryInterface<Address.Entity>
{
  constructor(private readonly db: PrismaService) {}

  async list(): Promise<Address.Entity[]> {
    return await this.db.address.findMany();
  }

  get(id: string): Promise<Address.Entity> {
    return this.db.address.findUnique({ where: { id } });
  }

  create(data: Address.Create): Promise<Address.Entity> {
    console.log(data);
    return this.db.address.create({ data });
  }

  update(id: string, data: unknown): Promise<Address.Entity> {
    return this.db.address.update({ where: { id }, data });
  }

  delete(id: string): Promise<boolean> {
    console.log(id);
    throw new Error('Method not implemented.');
  }
}
