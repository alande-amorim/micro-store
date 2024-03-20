import {
  Inject,
  Injectable,
  RequestTimeoutException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Product, SHOPIFY_SERVICE, makeSlug } from '@app/common';
import { PrismaService } from './prisma.service';
import { ClientProxy } from '@nestjs/microservices';
import { TimeoutError, catchError, map, throwError, timeout } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(SHOPIFY_SERVICE) private readonly shopifyClient: ClientProxy,
    private readonly db: PrismaService,
  ) {}

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

    const exists = await this.db.product.findFirst({
      where: { OR: [{ slug: payload.slug }, { sku: payload.sku }] },
    });
    if (exists) {
      throw new UnprocessableEntityException('Slug or SKU already taken.');
    }

    const product = await this.db.product.create({ data: payload });

    return this.shopifyClient.send('createProduct', product).pipe(
      map(async (res) => {
        return await this.db.product.update({
          where: { id: product.id },
          data: { externalId: res.productId },
        });
      }),
    );
  }

  async update(id: string, data: Product.Update) {
    const product = await this.getById(id);
    if (!product) throw new UnprocessableEntityException('Product not found');

    return this.shopifyClient
      .send('updateProduct', { ...product, ...data })
      .pipe(
        timeout(5000),
        catchError((err) => {
          if (err instanceof TimeoutError) {
            return throwError(() => new RequestTimeoutException());
          }
          return throwError(() => err);
        }),
      );
  }

  async delete(id: string) {
    const product = await this.getById(id);
    if (!product) throw new UnprocessableEntityException('Product not found');

    return this.shopifyClient.send('deleteProduct', product).pipe(
      timeout(5000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  }
}
