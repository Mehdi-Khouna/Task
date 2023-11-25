import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Task')
    .setDescription('Task Api')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Test')
    .build();
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api' , app , document)
  const configService = app.get(ConfigService)
  const port  = configService.get<number>('APP_PORT')
  app.useGlobalPipes(new ValidationPipe({transform: true}))
  await app.listen(port);
}
bootstrap();
