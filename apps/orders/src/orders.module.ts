import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CustomersRepository } from './repositories/customers.repository';
import { PrismaService } from './prisma.service';
import { AddressesRepository } from './repositories/addresses.repository';
import { OrdersRepository } from './repositories/orders.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        TCP_PORT: Joi.number().required(),
        HTTP_PORT: Joi.number().required(),
        DATABASE_URL: Joi.string().required(),
      }),
    }),
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    PrismaService,
    AddressesRepository,
    CustomersRepository,
    OrdersRepository,
  ],
})
export class OrdersModule {}
