import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ShopifyService } from './shopify.service';
import { Product } from '@app/common';

@Controller()
export class ShopifyController {
  constructor(private service: ShopifyService) {}

  @MessagePattern('listProducts')
  async listProducts(): Promise<unknown> {
    return this.service.listProducts();
  }

  @MessagePattern('getProduct')
  async getProduct(@Payload() data: Product.Entity): Promise<unknown> {
    return this.service.getProduct(data);
  }

  @MessagePattern('createPoduct')
  async createProduct(@Payload() data: Product.Entity): Promise<unknown> {
    const response = await this.service.createProduct(data);
    console.log(response);
    return response;
  }

  @MessagePattern('updatePoduct')
  async updateProduct(@Payload() data: Product.Entity): Promise<unknown> {
    const response = await this.service.createProduct(data);
    console.log(response);
    return response;
  }

  async deleteProduct(@Payload() data: Product.Entity): Promise<unknown> {
    const response = await this.service.createProduct(data);
    console.log(response);
    return response;
  }
}
