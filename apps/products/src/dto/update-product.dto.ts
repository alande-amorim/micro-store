import { IsNumber, IsOptional, Length, Min, ValidateIf } from 'class-validator';
import { Product } from '@app/common';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductDto implements Product.Update {
  @IsOptional()
  @Length(3, 255)
  @ApiPropertyOptional({ description: 'The name of the product' })
  name?: string;

  @IsOptional()
  @Length(3, 255)
  @ApiPropertyOptional({ description: 'The slug of the product' })
  slug?: string;

  @IsOptional()
  @Length(12, 12)
  @ApiPropertyOptional({ description: 'The SKU of the product' })
  sku?: string;

  @IsOptional()
  @IsNumber({
    maxDecimalPlaces: 2,
    allowInfinity: false,
    allowNaN: false,
  })
  @Min(0)
  @ApiPropertyOptional({
    description: 'The price of the product',
    type: 'number',
  })
  price?: number;

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
