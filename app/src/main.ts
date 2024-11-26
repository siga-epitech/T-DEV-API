import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; 

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurer Swagger
  const config = new DocumentBuilder()
    .setTitle('Trinity API') 
    .setDescription('API pour Trinity') 
    .setVersion('1.0') 
    .addTag('users') 
    .build();

  const document = SwaggerModule.createDocument(app, config); 
  SwaggerModule.setup('api', app, document); 

  await app.listen(3000);
  console.log('Application running on: http://localhost:3000');
  console.log('Swagger documentation available at: http://localhost:3000/api');
}
bootstrap();
