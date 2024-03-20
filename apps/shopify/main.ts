import { NestFactory } from '@nestjs/core';
import { ShopifyModule } from './src/shopify.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ShopifyModule);
  const conf = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [conf.getOrThrow('RABBITMQ_URI')],
      queue: 'shopify',
    },
  });

  await app.startAllMicroservices();

  app.listen(conf.get('HTTP_PORT'), () => {
    console.log(`Shopify service is running on: ${conf.get('HTTP_PORT')}`);
  });
}
bootstrap();
