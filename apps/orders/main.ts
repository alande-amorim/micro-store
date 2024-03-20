import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './src/orders.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  const conf = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [conf.getOrThrow('RABBITMQ_URI')],
      queue: 'orders',
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Orders API')
    .setVersion('0.1')
    .addTag('orders')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.startAllMicroservices();
  await app.listen(conf.get('HTTP_PORT'), () => {
    console.log(`Orders service is running on ${conf.get('HTTP_PORT')}`);
  });
}
bootstrap();
