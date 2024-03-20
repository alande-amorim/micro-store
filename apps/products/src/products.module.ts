import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, SHOPIFY_SERVICE } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
        DATABASE_URL: Joi.string().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),
        SHOPIFY_HOST: Joi.string().required(),
        SHOPIFY_PORT: Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (conf: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: conf.get('AUTH_HOST'),
            port: conf.get('AUTH_PORT'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: SHOPIFY_SERVICE,
        useFactory: (conf: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: conf.get('SHOPIFY_HOST'),
            port: conf.get('SHOPIFY_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [PrismaService, ProductsService],
})
export class ProductsModule {}
