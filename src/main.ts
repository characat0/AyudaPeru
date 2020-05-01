import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { PORT, DOC_PATH, CERT_FOLDER, PROTOCOL } from './config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from "fs";
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  let app: INestApplication;
  if (PROTOCOL === "HTTPS") {
    const httpsOptions = {
      key: fs.readFileSync(`/etc/letsencrypt/live/${CERT_FOLDER}/privkey.pem`),
      cert: fs.readFileSync(`/etc/letsencrypt/live/${CERT_FOLDER}/fullchain.pem`),
      ca: fs.readFileSync(`/etc/letsencrypt/live/${CERT_FOLDER}/chain.pem`)
    }
    app = await NestFactory.create(AppModule, { httpsOptions });
  } else {
    app = await NestFactory.create(AppModule);
  }

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
bootstrap()
  .then(() => console.log(`App running in ${PORT}.`));
