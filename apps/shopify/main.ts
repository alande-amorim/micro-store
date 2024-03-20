import { NestFactory } from '@nestjs/core';
import { ShopifyModule } from './src/shopify.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { initSentry } from '@app/common/monitor/sentry';
import { RpcExceptionsFilter } from '@app/common/filters/rpc-exception.filter';
import { HttpExceptionFilter } from '@app/common/filters';

async function bootstrap() {
  const app = await NestFactory.create(ShopifyModule);
  const conf = app.get(ConfigService);
  initSentry(conf.get('SENTRY_DSN'));

  app.useGlobalFilters(
    new HttpExceptionFilter('SHOPIFY_SERVICE'),
    new RpcExceptionsFilter('SHOPIFY_SERVICE'),
  );

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [conf.getOrThrow('RABBITMQ_URI')],
      noAck: false,
      queue: 'shopify',
    },
  });

  await app.startAllMicroservices();

  app.listen(conf.get('HTTP_PORT'), () => {
    console.log(`Shopify service is running on: ${conf.get('HTTP_PORT')}`);
  });
}
bootstrap();
