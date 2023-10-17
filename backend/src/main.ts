require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(3001);
    console.log('app started');
    const config = new DocumentBuilder()
    .setTitle('Perago Information systems')
    .setDescription('Organizational Heirarchy')
    .setVersion('1.0')
    .addTag('PIS')
    .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
}
bootstrap();
///
