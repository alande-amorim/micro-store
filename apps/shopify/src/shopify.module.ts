import { Module } from '@nestjs/common';
import { ShopifyController } from './shopify.controller';
import { ShopifyService } from './shopify.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { createShopifyGraphqlSdkClient } from './clients/shopify-graphql-sdk.client';
import { GraphqlProductsRepository } from './repositories/graphql-products.repository';
import { ORDERS_SERVICE } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
        SHOPIFY_ACCESS_TOKEN: Joi.string().required(),
        SHOPIFY_STORE_URL: Joi.string().required(),
        SHOPIFY_API_VERSION: Joi.string().required(),
        ORDERS_HOST: Joi.string().required(),
        ORDERS_PORT: Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: ORDERS_SERVICE,
        useFactory: (conf: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: conf.get('ORDERS_HOST'),
            port: conf.get('ORDERS_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
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
