import { NestFactory } from '@nestjs/core';
import { ShopifyModule } from './src/shopify.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ShopifyModule);
  const conf = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: conf.get('TCP_PORT'),
    },
  });
  await app.startAllMicroservices();

  app.listen(conf.get('HTTP_PORT'), () => {
    console.log(`Shopify service is running on: ${conf.get('HTTP_PORT')}`);
  });
}
bootstrap();
