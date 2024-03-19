import { Injectable } from '@nestjs/common';
import { Product } from '@app/common';
import { GraphqlProductsRepository } from './repositories/graphqlProducts.repository';

@Injectable()
export class ShopifyService {
  constructor(private repo: GraphqlProductsRepository) {}

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
}
