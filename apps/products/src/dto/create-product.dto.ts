import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
  Min,
  ValidateIf,
} from 'class-validator';
import { Product } from '@app/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto implements Product.Create {
  @IsNotEmpty()
  @Length(3, 255)
  @ApiProperty({ description: 'The name of the product' })
  name: string;

  @IsOptional()
  @Length(3, 255)
  @ApiPropertyOptional({ description: 'The slug of the product' })
  slug?: string;

  @IsNotEmpty()
  @Length(12, 12)
  @ApiProperty({ description: 'The SKU of the product' })
  sku: string;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 2,
    allowInfinity: false,
    allowNaN: false,
  })
  @Min(0)
  @ApiProperty({ description: 'The price of the product', type: 'number' })
  price: number;

  @IsOptional()
  @IsNumber({
    maxDecimalPlaces: 2,
    allowInfinity: false,
    allowNaN: false,
  })
  @Min(0, { message: 'Sale price must be greater than 0' })
  @ValidateIf((o) => o.salePrice !== undefined)
  @ApiPropertyOptional({
    description: 'The sale price of the product',
    type: 'number',
  })
  salePrice?: number;

  @IsOptional()
  @ApiPropertyOptional({ description: 'The description of the product' })
  description?: string;
}
