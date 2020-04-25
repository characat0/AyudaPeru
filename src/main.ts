import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { PORT, DOC_PATH } from './config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204
  });
  const options = new DocumentBuilder()
    .setTitle('AyudaPerú')
    .setDescription('Documentación de la API de AyudaPerú')
    .setVersion('1.0')
    .build();

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(DOC_PATH, app, document);
  await app.listen(PORT);
}
bootstrap();
