import { Inject, Injectable, UseFilters } from '@nestjs/common';
import { ORDERS_SERVICE, Product, Shopify } from '@app/common';
import { GraphqlProductsRepository } from './repositories/graphql-products.repository';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { RpcExceptionFilter } from '@app/common/filters';
import { catchError, throwError } from 'rxjs';

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

  @UseFilters(RpcExceptionFilter)
  async handleWebhook(data: Shopify.Order.Created) {
    return await this.ordersClient.send('webhook', data).pipe(
      catchError((error) => {
        return throwError(() => new RpcException(error));
      }),
    );
  }
}
