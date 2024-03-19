import { NestFactory } from '@nestjs/core';
import { AuthModule } from './src/auth.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const conf = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: conf.get('TCP_PORT'),
    },
  });

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setVersion('0.1')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.startAllMicroservices();
  await app.listen(conf.get('HTTP_PORT'), () => {
    console.log(`Listening on port ${conf.get('HTTP_PORT')}`);
  });
}
bootstrap();
