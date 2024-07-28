import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
   // Swagger setup
   const config = new DocumentBuilder()
   .setTitle('Your API Title')
   .setDescription('The description of your API')
   .setVersion('1.0')
   .addTag('tag')
   .build();
 
 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
