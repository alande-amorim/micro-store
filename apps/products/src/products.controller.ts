import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard, Product } from '@app/common';

@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  @Get()
  getAll(): Promise<Product.Entity[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Product.Entity> {
    const product = await this.service.getById(id);
    if (!product) throw new NotFoundException('Product id not found');
    return product;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() product: CreateProductDto): Promise<Product.Entity> {
    return this.service.create(product);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() product: UpdateProductDto,
  ): Promise<Product.Entity> {
    return this.service.update(id, product);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.service.delete(id);
  }
}
