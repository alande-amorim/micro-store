import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
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

  @MessagePattern('createProduct')
  @UsePipes(new ValidationPipe())
  createProduct(@Payload() data: Product.Entity): Promise<unknown> {
    return this.service.createProduct(data);
  }

  @MessagePattern('updateProduct')
  updateProduct(@Payload() data: Product.Entity): Promise<unknown> {
    return this.service.createProduct(data);
  }

  @MessagePattern('deleteProduct')
  async deleteProduct(@Payload() data: Product.Entity): Promise<unknown> {
    return await this.service.deleteProduct(data);
  }
}
