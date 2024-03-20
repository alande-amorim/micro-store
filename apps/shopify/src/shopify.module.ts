import { Module } from '@nestjs/common';
import { ShopifyController } from './shopify.controller';
import { ShopifyService } from './shopify.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { createShopifyGraphqlSdkClient } from './clients/shopify-graphql-sdk.client';
import { GraphqlProductsRepository } from './repositories/graphql-products.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number(), // 👈 optional - only for debugging purposes
        TCP_PORT: Joi.number().required(),
        SHOPIFY_ACCESS_TOKEN: Joi.string().required(),
        SHOPIFY_STORE_URL: Joi.string().required(),
        SHOPIFY_API_VERSION: Joi.string().required(),
      }),
    }),
  ],
  controllers: [ShopifyController],
  providers: [
    ShopifyService,
    GraphqlProductsRepository,
    {
      provide: 'SHOPIFY_GRAPHQL_SDK', // 👈 codegen generated SDK from gql schema
      useFactory: createShopifyGraphqlSdkClient,
      inject: [ConfigService],
    },
    {
      provide: 'SHOPIFY_SDK', // 👈 official Shopify
      useFactory: (conf: ConfigService) => conf,
      inject: [ConfigService],
    },
  ],
})
export class ShopifyModule {}
