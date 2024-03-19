import { NestFactory } from '@nestjs/core';
import { ShopifyModule } from './src/shopify.module';

async function bootstrap() {
  const app = await NestFactory.create(ShopifyModule);
  await app.listen(3003);
}
bootstrap();
