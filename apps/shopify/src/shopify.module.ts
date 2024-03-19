import { Module } from '@nestjs/common';
import { ShopifyController } from './shopify.controller';
import { ShopifyService } from './shopify.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.required(),
        SHOPIFY_ACCESS_TOKEN: Joi.required(),
        SHOPIFY_STORE_URL: Joi.required(),
        SHOPIFY_API_VERSION: Joi.required(),
      }),
    }),
  ],
  controllers: [ShopifyController],
  providers: [ShopifyService],
})
export class ShopifyModule {}
