import { NestFactory } from '@nestjs/core';
import { AuthModule } from './src/auth.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const conf = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Auth API')
    .setVersion('0.1')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(conf.get('PORT'), () => {
    console.log(`Listening on port ${conf.get('PORT')}`);
  });
}
bootstrap();
