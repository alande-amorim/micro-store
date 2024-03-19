import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { ProductsModule } from './src/products.module';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  const conf = app.get(ConfigService);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setVersion('0.1')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(conf.get('HTTP_PORT'), () => {
    console.log(`Listening on port ${conf.get('HTTP_PORT')}`);
  });
}
bootstrap();
