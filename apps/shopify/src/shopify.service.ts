import { Inject, Injectable } from '@nestjs/common';
import { ORDERS_SERVICE, Product } from '@app/common';
import { GraphqlProductsRepository } from './repositories/graphql-products.repository';
import { WebhookOrderCreatedDto } from './dto/webhook-order-created.dto';
import { ClientProxy } from '@nestjs/microservices';

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

  handleWebhook(payload: WebhookOrderCreatedDto) {
    return this.ordersClient.send('webhook', payload);
  }
}
