import { Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { ORDERS_SERVICE, Product, Shopify } from '@app/common';
import { GraphqlProductsRepository } from './repositories/graphql-products.repository';
import { ClientProxy } from '@nestjs/microservices';
import { TimeoutError, catchError, throwError, timeout } from 'rxjs';

@Injectable()
export class ShopifyService {
  constructor(
    @Inject(ORDERS_SERVICE) private ordersClient: ClientProxy,
    private repo: GraphqlProductsRepository,
  ) {}

  async listProducts(): Promise<Product.External[]> {
    return await this.repo.list();
  }

  async getProduct(data: Product.Entity): Promise<Product.External> {
    return await this.repo.get(data);
  }

  async createProduct(data: Product.Entity): Promise<Product.External> {
    return await this.repo.create(data);
  }

  async updateProduct(data: Product.Entity): Promise<Product.External> {
    return await this.repo.update(data);
  }

  async deleteProduct(data: Product.Entity): Promise<string> {
    return await this.repo.delete(data);
  }

  async handleWebhook(data: Shopify.Order.Created) {
    return this.ordersClient.send('webhook', data).pipe(
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
