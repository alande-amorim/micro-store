import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Product, makeSlug } from '@app/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly db: PrismaService) {}

  async getAll(): Promise<Product.Entity[] | never> {
    return this.db.product.findMany();
  }

  async getById(id: string): Promise<Product.Entity | null> {
    return this.db.product.findUnique({ where: { id } });
  }

  async create({ slug, ...input }: Product.Create) {
    const payload = {
      ...input,
      slug: slug || makeSlug(input.name),
    };

    const product = await this.db.product.findFirst({
      where: { OR: [{ slug: payload.slug }, { sku: payload.sku }] },
    });
    if (product) {
      throw new UnprocessableEntityException('Slug or SKU already taken.');
    }

    return this.db.product.create({ data: payload });
  }

  async update(id: string, data: Product.Update): Promise<Product.Entity> {
    return this.db.product.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<boolean | never> {
    const deleted = await this.db.product.delete({ where: { id } });
    if (!deleted) throw new UnprocessableEntityException('Product not found');
    return true;
  }
}
